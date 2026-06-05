// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { createAdminClient, DB_ID, PROJECTS_ID } from "@/lib/appwrite.server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    const doc = await databases.getDocument(DB_ID, PROJECTS_ID, id);

    return NextResponse.json({
      ...doc,
      contributors: doc.contributors ? JSON.parse(doc.contributors) : [],
    });
  } catch (e: any) {
    console.error("GET /api/projects/[id] error:", e);
    return NextResponse.json({ error: e.message }, { status: 404 });
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    const body = await req.json();

    const doc = await databases.updateDocument(DB_ID, PROJECTS_ID, id, {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl || null,
      link: body.link || null,
      githubUrl: body.githubUrl || null,
      secondaryGithubUrl: body.secondaryGithubUrl || null,
      category: body.category,
      projectType: body.projectType,
      contributors: body.contributors
        ? JSON.stringify(body.contributors)
        : null,
      isFeatured: body.isFeatured || false,
    });

    return NextResponse.json({
      ...doc,
      contributors: body.contributors || [],
    });
  } catch (e: any) {
    console.error("PUT /api/projects/[id] error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    await databases.deleteDocument(DB_ID, PROJECTS_ID, id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("DELETE /api/projects/[id] error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
