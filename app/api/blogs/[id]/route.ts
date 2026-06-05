import { NextResponse } from "next/server";
import { createAdminClient, DB_ID, BLOGS_ID } from "@/lib/appwrite.server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    const doc = await databases.getDocument(DB_ID, BLOGS_ID, id);
    return NextResponse.json(doc);
  } catch (e: any) {
    console.error("GET /api/blogs/[id] error:", e);
    return NextResponse.json({ error: e.message }, { status: 404 });
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    const body = await req.json();
    const doc = await databases.updateDocument(DB_ID, BLOGS_ID, id, {
      postTitle: body.postTitle,
      author: body.author,
      content: body.content,
      publishDate: body.publishDate,
      category: body.category || null,
      featuredImage: body.featuredImage || null,
    });
    return NextResponse.json(doc);
  } catch (e: any) {
    console.error("PUT /api/blogs/[id] error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    await databases.deleteDocument(DB_ID, BLOGS_ID, id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("DELETE /api/blogs/[id] error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
