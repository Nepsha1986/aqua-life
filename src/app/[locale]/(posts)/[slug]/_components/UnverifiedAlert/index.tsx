import { getPageDictionary } from "@/i18n/server/getPageDictionary";
import { Alert } from "@/ui";

export const UnverifiedAlert = async ({ locale }) => {
  const dictionary = await getPageDictionary(locale, "unverified_alert");

  return (
    <Alert
      message={dictionary.message}
      type="warning"
      description={dictionary.description}
    />
  );
};
