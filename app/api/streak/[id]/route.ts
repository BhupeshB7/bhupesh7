import { NextResponse } from "next/server";
import { createAdminClient, DB_ID, STREAK_ID } from "@/lib/appwrite.server";

type Ctx = { params: Promise<{ id: string }> };

function parseDoc(doc: any) {
  return {
    ...doc,
    dsaMeta: doc.dsaMeta ? JSON.parse(doc.dsaMeta) : [],
    nodeMeta: doc.nodeMeta ? JSON.parse(doc.nodeMeta) : [],
    systemMeta: doc.systemMeta ? JSON.parse(doc.systemMeta) : [],
  };
}

export async function GET(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    const doc = await databases.getDocument(DB_ID, STREAK_ID, id);
    return NextResponse.json(parseDoc(doc));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 404 });
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    const body = await req.json();
    const doc = await databases.updateDocument(DB_ID, STREAK_ID, id, {
      date: body.date,
      dsaDone: body.dsaDone ?? false,
      dsaCount: body.dsaCount ?? 0,
      dsaMeta: body.dsaMeta ? JSON.stringify(body.dsaMeta) : "[]",
      nodeDone: body.nodeDone ?? false,
      nodeCount: body.nodeCount ?? 0,
      nodeMeta: body.nodeMeta ? JSON.stringify(body.nodeMeta) : "[]",
      systemDone: body.systemDone ?? false,
      systemCount: body.systemCount ?? 0,
      systemMeta: body.systemMeta ? JSON.stringify(body.systemMeta) : "[]",
    });
    return NextResponse.json(parseDoc(doc));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const { databases } = createAdminClient();
    await databases.deleteDocument(DB_ID, STREAK_ID, id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
