// app/api/projects/route.ts
import { NextResponse } from "next/server";
import {
  createAdminClient,
  DB_ID,
  PROJECTS_ID,
  ID,
  Query,
} from "@/lib/appwrite.server";

export async function GET() {
  try {
    const { databases } = createAdminClient();
    const res = await databases.listDocuments(DB_ID, PROJECTS_ID, [
      Query.orderDesc("$createdAt"),
    ]);

    const documents = res.documents.map((doc) => ({
      ...doc,
      contributors: doc.contributors ? JSON.parse(doc.contributors) : [],
    }));

    return NextResponse.json(documents);
  } catch (e: any) {
    console.error("GET /api/projects error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { databases } = createAdminClient();
    const body = await req.json();

    const doc = await databases.createDocument(
      DB_ID,
      PROJECTS_ID,
      ID.unique(),
      {
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
      },
    );

    return NextResponse.json(
      {
        ...doc,
        contributors: body.contributors || [],
      },
      { status: 201 },
    );
  } catch (e: any) {
    console.error("POST /api/projects error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
