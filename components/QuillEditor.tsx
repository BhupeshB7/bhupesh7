"use client";
import { useEffect, useRef } from "react";
import { ID, STORAGE_ID } from "@/lib/appwrite.client";
import { storage } from "@/lib/appwrite.client";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
};

function extractFileIdFromUrl(url: string): string | null {
  const match = url.match(/\/files\/([^\/]+)\/view/);
  return match ? match[1] : null;
}

async function deleteFromStorage(fileId: string) {
  try {
    await storage.deleteFile(STORAGE_ID, fileId);
  } catch (error) {
    console.error("Failed to delete file from storage:", error);
  }
}

function uploadToAppwrite(
  file: File,
  onProgress: (pct: number) => void,
  signal: AbortSignal,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileId = ID.unique();
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

    const formData = new FormData();
    formData.append("fileId", fileId);
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    signal.addEventListener("abort", () => {
      xhr.abort();
      reject(new DOMException("Upload cancelled", "AbortError"));
    });

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable)
        onProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(
          `${endpoint}/storage/buckets/${STORAGE_ID}/files/${fileId}/view?project=${projectId}`,
        );
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err.message || "Upload failed"));
        } catch {
          reject(new Error("Upload failed"));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.onabort = () =>
      reject(new DOMException("Upload cancelled", "AbortError"));

    xhr.open("POST", `${endpoint}/storage/buckets/${STORAGE_ID}/files`);
    xhr.setRequestHeader("X-Appwrite-Project", projectId);
    xhr.send(formData);
  });
}

export default function QuillEditor({
  value,
  onChange,
  onUploadStart,
  onUploadEnd,
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const initialized = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const updateOverlay = (progress: number, onCancel: () => void) => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.display = "flex";
    const bar = el.querySelector<HTMLDivElement>(".upload-bar");
    const pct = el.querySelector<HTMLSpanElement>(".upload-pct");
    const btn = el.querySelector<HTMLButtonElement>(".upload-cancel");
    if (bar) bar.style.width = `${progress}%`;
    if (pct) pct.textContent = `${progress}%`;
    if (btn) btn.onclick = onCancel;
  };

  const hideOverlay = () => {
    if (overlayRef.current) overlayRef.current.style.display = "none";
  };

  useEffect(() => {
    if (initialized.current || !editorRef.current) return;
    initialized.current = true;

    const load = async () => {
      const Quill = (await import("quill")).default;
      // await import("quill/dist/quill.snow.css");

      const quill = new Quill(editorRef.current!, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "code-block"],
              ["link", "image"],
              ["clean"],
            ],
            handlers: {
              image: () => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.click();

                input.onchange = async () => {
                  const file = input.files?.[0];
                  if (!file) return;

                  const controller = new AbortController();
                  abortRef.current = controller;
                  onUploadStart?.();

                  const selection = quill.getSelection(true);
                  const insertIndex = selection
                    ? selection.index
                    : quill.getLength();

                  const PLACEHOLDER_TEXT = ` [uploading: ${file.name}] `;
                  quill.insertText(
                    insertIndex,
                    PLACEHOLDER_TEXT,
                    { color: "#9333ea", italic: true },
                    "user",
                  );
                  quill.setSelection(
                    insertIndex + PLACEHOLDER_TEXT.length,
                    0,
                    "silent",
                  );

                  try {
                    const url = await uploadToAppwrite(
                      file,
                      (pct) => updateOverlay(pct, () => controller.abort()),
                      controller.signal,
                    );

                    quill.deleteText(
                      insertIndex,
                      PLACEHOLDER_TEXT.length,
                      "user",
                    );
                    quill.insertEmbed(insertIndex, "image", url, "user");
                    quill.insertText(insertIndex + 1, "\n", "user");
                    quill.setSelection(insertIndex + 2, 0, "silent");
                    onChange(quill.root.innerHTML);
                  } catch (err: any) {
                    quill.deleteText(
                      insertIndex,
                      PLACEHOLDER_TEXT.length,
                      "user",
                    );
                    onChange(quill.root.innerHTML);
                    if (err.name !== "AbortError") {
                      alert(
                        "Image upload failed. Check storage bucket permissions.",
                      );
                    }
                  } finally {
                    hideOverlay();
                    onUploadEnd?.();
                    abortRef.current = null;
                  }
                };
              },
            },
          },
        },
        placeholder: "Write your blog content here...",
      });

      quillRef.current = quill;
      if (value) quill.root.innerHTML = value;

      quill.on(
        "text-change",
        async (_delta: any, _old: any, source: string) => {
          if (source === "user") {
            const newHtml = quill.root.innerHTML;
            onChange(newHtml);
          }
        },
      );
    };

    load();
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    if (quill.root.innerHTML !== value) {
      const sel = quill.getSelection();
      quill.root.innerHTML = value || "";
      if (sel) quill.setSelection(sel.index, sel.length, "silent");
    }
  }, [value]);

  return (
    <div className="quill-dark relative">
      <div ref={editorRef} />

      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a14]/80 backdrop-blur-sm rounded-b-lg gap-4 pointer-events-auto"
      >
        <div className="bg-gradient-to-br from-[#1e1e2e] to-[#13131f] border border-[#3b3b5c] rounded-xl p-6 flex flex-col items-center gap-4 w-72 shadow-2xl">
          <p className="text-sm text-gray-300 font-medium">
            Uploading image...
          </p>
          <div className="w-full bg-[#13131f] rounded-full h-2 overflow-hidden">
            <div
              className="upload-bar h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-150 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
          <span className="upload-pct text-xs text-purple-400 font-mono tabular-nums">
            0%
          </span>
          <button
            type="button"
            className="upload-cancel px-4 py-1.5 text-xs border border-red-700/50 hover:border-red-500 text-red-400 hover:text-red-300 rounded-lg transition-colors"
          >
            Cancel Upload
          </button>
        </div>
      </div>

      <style>{`
        .quill-dark .ql-toolbar {
          background: linear-gradient(135deg, #1e1e2e 0%, #13131f 100%);
          border-color: #3b3b5c !important;
          border-radius: 12px 12px 0 0;
          border-bottom: 1px solid #3b3b5c !important;
        }
        .quill-dark .ql-toolbar .ql-stroke { stroke: #a0a0c0; }
        .quill-dark .ql-toolbar .ql-fill { fill: #a0a0c0; }
        .quill-dark .ql-toolbar .ql-picker-label { color: #a0a0c0; }
        .quill-dark .ql-toolbar button:hover .ql-stroke,
        .quill-dark .ql-toolbar button.ql-active .ql-stroke { stroke: #9333ea; }
        .quill-dark .ql-toolbar button:hover .ql-fill,
        .quill-dark .ql-toolbar button.ql-active .ql-fill { fill: #9333ea; }
        .quill-dark .ql-container {
          background: #0a0a14;
          border-color: #3b3b5c !important;
          border-radius: 0 0 12px 12px;
          font-size: 15px;
        }
        .quill-dark .ql-editor { color: #e2e2f0; min-height: 400px; padding: 20px; }
        .quill-dark .ql-editor.ql-blank::before { color: #555570; font-style: normal; }
        .quill-dark .ql-editor img {
          max-width: 100%;
          border-radius: 12px;
          margin: 16px 0;
          display: block;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          cursor: pointer;
          max-height: 300px;
          object-fit: cover;

          transition: all 0.2s;
        }
        .quill-dark .ql-editor img:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
        .quill-dark .ql-picker-options { background: #1e1e2e; border-color: #3b3b5c; }
        .quill-dark .ql-picker-item { color: #a0a0c0; }
        .quill-dark .ql-picker-item:hover { color: #9333ea; }
        .quill-dark .ql-tooltip {
          background: #1e1e2e;
          border-color: #3b3b5c;
          color: #e2e2f0;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          border-radius: 12px;
        }
        .quill-dark .ql-tooltip input {
          background: #13131f;
          border-color: #3b3b5c;
          color: #e2e2f0;
          border-radius: 8px;
        }
        .quill-dark .ql-tooltip a.ql-action { color: #9333ea; }
        .quill-dark .ql-tooltip a.ql-remove { color: #f87171; }
      `}</style>
    </div>
  );
}
