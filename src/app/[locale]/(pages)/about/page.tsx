import SimpleMDXPage, { generateMDXMetadata } from "@/components/SimpleMDXPage";

export default function About(params: any) {
  return <SimpleMDXPage {...params} page="about" />;
}

export const generateMetadata = async (context: any) =>
  generateMDXMetadata({ ...context, page: "about" });
