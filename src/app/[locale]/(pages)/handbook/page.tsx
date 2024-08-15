import React from "react";
import SimpleMDXPage, { generateMDXMetadata } from "@/components/SimpleMDXPage";
import PostsLinks from "./_components/PostsLinks";

const page = "handbook";
export default function Handbook(params: any) {
  return <SimpleMDXPage {...params} page={page} components={{ PostsLinks }} />;
}

export const generateMetadata = async (context: any) =>
  generateMDXMetadata({ ...context, page });
