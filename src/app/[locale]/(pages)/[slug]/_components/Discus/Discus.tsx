"use client";

import { DiscussionEmbed } from "disqus-react";
import { Locale } from "@/i18n";
import { useEffect, useState } from "react";

interface Props {
  url: string;
  id: string;
  title: string;
  locale: Locale;
}

const Discus = ({ url, id, title, locale }: Props) => {
  const [key, setKey] = useState<number>(1);

  const triggerDiscuss = () => {
    setKey(Math.random());
  };

  useEffect(() => {
    window.addEventListener("themeApplied", triggerDiscuss);

    return () => {
      window.removeEventListener("themeApplied", triggerDiscuss);
    };
  }, [window]);
  return (
    <div style={{ opacity: 1 }}>
      {!!key && (
        <DiscussionEmbed
          key={key}
          shortname="aquajoy"
          config={{
            url,
            identifier: id,
            title,
            language: locale,
          }}
        />
      )}
    </div>
  );
};

export default Discus;
