import SimpleMDXPage, { generateMDXMetadata } from "@/components/SimpleMDXPage";
import { Locale } from "@/i18n";

export default function About(props: any) {
  return <SimpleMDXPage {...props} />;
}

export const generateMetadata = async (context: any) =>
  generateMDXMetadata(context);
