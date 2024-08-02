import { getPageDictionary } from "@/i18n/server/getPageDictionary";
import { Alert } from "@/ui";
import { t } from "@/i18n";
import { UnverifiedAlertI18n } from "@/i18n/types";
import Link from "next/link";

export const UnverifiedAlert = async ({ locale }) => {
  const dictionary = await getPageDictionary<UnverifiedAlertI18n>(
    locale,
    "unverified_alert",
  );

  return (
    <Alert
      message={t(dictionary.message)}
      type="warning"
      description={t(dictionary.description)}
      footer={
        <Link href={`/${locale}/about#contribute`}>
          {dictionary.contribute_text}
        </Link>
      }
    />
  );
};
