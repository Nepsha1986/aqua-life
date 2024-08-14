import { fetchPosts } from "@/utils/fetchPosts";
import { NextRequest } from "next/server";
import { Locale } from "@/i18n";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const locale = searchParams.get("locale") as Locale;

  const pageNumber = page ? parseInt(page, 10) : undefined;
  const sizeNumber = size ? parseInt(size, 10) : undefined;

  const res = await fetchPosts(locale, pageNumber, sizeNumber);

  return Response.json(res);
}
