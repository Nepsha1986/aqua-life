import SimpleMDXPage, { generateMDXMetadata } from "@/components/SimpleMDXPage";

export default function About(props) {
  return <SimpleMDXPage {...props} />;
}

export const generateMetadata = async (context) => generateMDXMetadata(context);
