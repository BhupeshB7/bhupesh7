import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const storage = new Storage(client);
export { ID };
export const STORAGE_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!;
