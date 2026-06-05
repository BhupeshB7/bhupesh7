"use client";
import { useState, useRef, useCallback } from "react";
import { ID, STORAGE_ID } from "@/lib/appwrite.client";

type UploadState =
  | { status: "idle" }
  | { status: "uploading"; progress: number; fileName: string }
  | { status: "done"; url: string; fileName: string }
  | { status: "error"; message: string };

type Props = {
  value: string;
  onChange: (url: string) => void;
};

function uploadToAppwrite(
  file: File,
  onProgress: (pct: number) => void,
  signal: AbortSignal,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileId = ID.unique();
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
    const url = `${endpoint}/storage/buckets/${STORAGE_ID}/files`;

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
        const viewUrl = `${endpoint}/storage/buckets/${STORAGE_ID}/files/${fileId}/view?project=${projectId}`;
        resolve(viewUrl);
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err.message || "Upload failed"));
        } catch {
          reject(new Error("Upload failed"));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.onabort = () =>
      reject(new DOMException("Upload cancelled", "AbortError"));

    xhr.open("POST", url);
    xhr.setRequestHeader("X-Appwrite-Project", projectId);
    xhr.send(formData);
  });
}

export default function ImageUploader({ value, onChange }: Props) {
  const [state, setState] = useState<UploadState>({ status: "idle" });
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setState({ status: "error", message: "Only image files are allowed." });
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;
      setState({ status: "uploading", progress: 0, fileName: file.name });

      try {
        const url = await uploadToAppwrite(
          file,
          (pct) =>
            setState({
              status: "uploading",
              progress: pct,
              fileName: file.name,
            }),
          controller.signal,
        );
        setState({ status: "done", url, fileName: file.name });
        onChange(url);
      } catch (err: any) {
        if (err.name === "AbortError") {
          setState({ status: "idle" });
        } else {
          setState({
            status: "error",
            message: err.message || "Upload failed.",
          });
        }
      } finally {
        abortRef.current = null;
      }
    },
    [onChange],
  );

  const handleFiles = (files: FileList | null) => {
    if (files?.[0]) startUpload(files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const handleRemove = () => {
    onChange("");
    setState({ status: "idle" });
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  if (state.status === "done" || (state.status === "idle" && value)) {
    const imgUrl = state.status === "done" ? state.url : value;
    const fileName = state.status === "done" ? state.fileName : "Current image";
    return (
      <div className="relative rounded-xl overflow-hidden border border-[#3b3b5c] group">
        <img src={imgUrl} alt="Featured" className="w-full h-52 object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform flex items-center justify-between">
          <span className="text-xs text-gray-300 truncate max-w-[70%]">
            {fileName}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 text-xs bg-[#1e1e2e]/90 border border-[#3b3b5c] hover:border-purple-600 text-gray-300 rounded-lg transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 text-xs bg-[#1e1e2e]/90 border border-red-800/50 hover:border-red-500 text-red-400 rounded-lg transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    );
  }

  if (state.status === "uploading") {
    return (
      <div className="rounded-xl border border-[#3b3b5c] bg-[#13131f] p-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 w-full">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-purple-400 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-300 truncate">{state.fileName}</p>
            <p className="text-xs text-gray-500">
              Uploading to Appwrite Storage...
            </p>
          </div>
          <span className="text-sm font-mono text-purple-400 shrink-0">
            {state.progress}%
          </span>
        </div>

        <div className="w-full bg-[#1e1e2e] rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-150"
            style={{ width: `${state.progress}%` }}
          />
        </div>

        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-1.5 text-xs border border-red-800/50 hover:border-red-500 text-red-400 rounded-lg transition-colors"
        >
          Cancel Upload
        </button>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-xl border border-red-800/50 bg-[#13131f] p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-red-400">{state.message}</p>
        </div>
        <button
          type="button"
          onClick={() => setState({ status: "idle" })}
          className="px-3 py-1.5 text-xs border border-[#3b3b5c] hover:border-purple-600 text-gray-400 rounded-lg transition-colors shrink-0"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`
        rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 p-8
        flex flex-col items-center justify-center gap-3 select-none
        ${
          dragging
            ? "border-purple-500 bg-purple-600/10 scale-[1.01]"
            : "border-[#3b3b5c] bg-[#13131f] hover:border-purple-600/60 hover:bg-purple-600/5"
        }
      `}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${dragging ? "bg-purple-600/30" : "bg-[#1e1e2e]"}`}
      >
        <svg
          className={`w-6 h-6 transition-colors ${dragging ? "text-purple-400" : "text-gray-500"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="text-center">
        <p
          className={`text-sm font-medium transition-colors ${dragging ? "text-purple-300" : "text-gray-400"}`}
        >
          {dragging ? "Drop image here" : "Drag & drop or click to upload"}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          PNG, JPG, WEBP, GIF supported
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
