import { fetchPosts } from "@/utils/fetchPosts";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  const pageNumber = page ? parseInt(page, 10) : undefined;
  const sizeNumber = size ? parseInt(size, 10) : undefined;

  const posts = await fetchPosts("en", pageNumber, sizeNumber);

  return Response.json(posts);
}
