import Link from "next/link";
import { Locale } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/improve_article_block/en.json";
import { t } from "@/i18n";
import { Alert } from "@/ui";

interface Props {
  link: string;
  locale: Locale;
}

const ImproveArticleBlock = async ({ link, locale }: Props) => {
  const dict = await getDictionary<typeof dictionary>(
    locale,
    "improve_article_block",
  );

  return (
    <Alert
      description={t(dict.description)}
      type="info"
      footer={<Link href={link}>{t(dict.link_text)}</Link>}
    />
  );
};

export default ImproveArticleBlock;
