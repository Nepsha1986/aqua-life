import { getDictionary } from "@/i18n/server/getDictionary";
import { Alert } from "@/ui";
import { Locale, t } from "@/i18n";
import { UnverifiedAlertI18n } from "@/i18n/types";
import Link from "next/link";

interface Props {
  locale: Locale;
  discussionLink: string;
}
export const UnverifiedAlert = async ({ locale, discussionLink }: Props) => {
  const dictionary = await getDictionary<UnverifiedAlertI18n>(
    locale,
    "unverified_alert",
  );

  return (
    <Alert
      message={t(dictionary.message)}
      type="warning"
      description={t(dictionary.description)}
      footer={<Link href={discussionLink}>{dictionary.contribute_text}</Link>}
    />
  );
};
