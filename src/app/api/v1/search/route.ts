import { fetchPosts } from "@/utils/fetchPosts";
import { NextRequest, NextResponse } from "next/server";
import { Locale } from "@/i18n";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") as Locale;

  if (locale === null)
    return new NextResponse("Locale search param is required", {
      status: 400,
    });

  try {
    const { data } = await fetchPosts(locale, 0, 99999);
    return NextResponse.json(data);
  } catch (e) {
    return new NextResponse("Failed to fetch posts", { status: 500 });
  }
}
