import { NextResponse } from "next/server";
import { createAdminClient, DB_ID, STREAK_ID, ID, Query } from "@/lib/appwrite.server";

function parseDoc(doc: any) {
  return {
    ...doc,
    dsaMeta: doc.dsaMeta ? JSON.parse(doc.dsaMeta) : [],
    nodeMeta: doc.nodeMeta ? JSON.parse(doc.nodeMeta) : [],
    systemMeta: doc.systemMeta ? JSON.parse(doc.systemMeta) : [],
  };
}

export async function GET() {
  try {
    const { databases } = createAdminClient();
    const res = await databases.listDocuments(DB_ID, STREAK_ID, [
      Query.orderDesc("date"),
    ]);
    return NextResponse.json(res.documents.map(parseDoc));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { databases } = createAdminClient();
    const body = await req.json();
    const doc = await databases.createDocument(DB_ID, STREAK_ID, ID.unique(), {
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
    return NextResponse.json(parseDoc(doc), { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
