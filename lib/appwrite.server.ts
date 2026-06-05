import { Client, Databases, Storage, ID, Query } from "node-appwrite";

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_SECRET!);
  return {
    databases: new Databases(client),
    storage: new Storage(client),
  };
}

export { ID, Query };
export const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const BLOGS_ID = process.env.NEXT_PUBLIC_APPWRITE_BLOGS_COLLECTION_ID!;
export const STORAGE_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!;
export const PROJECTS_ID =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID!;
export const STREAK_ID = process.env.NEXT_PUBLIC_APPWRITE_STREAK_COLLECTION_ID!;
