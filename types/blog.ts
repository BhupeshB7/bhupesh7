export type Blog = {
  $id: string;
  postTitle: string;
  author: string;
  content: string;
  publishDate: string;
  category: string | null;
  viewCount: number;
  featuredImage: string | null;
  $createdAt: string;
  $updatedAt: string;
};

export type BlogPayload = {
  postTitle: string;
  author: string;
  content: string;
  publishDate: string;
  category?: string;
  viewCount?: number;
  featuredImage?: string;
};
