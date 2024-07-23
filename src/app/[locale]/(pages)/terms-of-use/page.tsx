import SimpleMDXPage, { generateMDXMetadata } from "@/components/SimpleMDXPage";

export default function About(props: any) {
  return <SimpleMDXPage {...props} page="terms-of-use" />;
}

export const generateMetadata = async (context: any) =>
  generateMDXMetadata({ ...context, page: "terms-of-use" });
