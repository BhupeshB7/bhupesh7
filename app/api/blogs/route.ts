import { NextResponse } from "next/server";
import { createAdminClient, DB_ID, BLOGS_ID, ID, Query } from "@/lib/appwrite.server";

export async function GET() {
  try {
    const { databases } = createAdminClient();
    const res = await databases.listDocuments(DB_ID, BLOGS_ID, [
      Query.orderDesc("$createdAt"),
    ]);
    return NextResponse.json(res.documents);
  } catch (e: any) {
    console.error("GET /api/blogs error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { databases } = createAdminClient();
    const body = await req.json();
    const doc = await databases.createDocument(DB_ID, BLOGS_ID, ID.unique(), {
      postTitle: body.postTitle,
      author: body.author,
      content: body.content,
      publishDate: body.publishDate,
      category: body.category || null,
      viewCount: 0,
      featuredImage: body.featuredImage || null,
    });
    return NextResponse.json(doc, { status: 201 });
  } catch (e: any) {
    console.error("POST /api/blogs error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
