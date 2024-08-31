"use client";

import { useEffect, useState, useCallback } from "react";
import { DiscussionEmbed } from "disqus-react";

import { Locale } from "@/i18n";

interface Props {
  url: string;
  id: string;
  title: string;
  locale: Locale;
}

const Discus = ({ url, id, title, locale }: Props) => {
  const [key, setKey] = useState<number>(1);
  const [render, setRender] = useState(false);

  const triggerDisqus = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  // Hotfix to solve the problem with styling for dark/light modes
  useEffect(() => {
    window.addEventListener("themeApplied", triggerDisqus);

    return () => {
      window.removeEventListener("themeApplied", triggerDisqus);
    };
  }, [triggerDisqus]);

  // Hotfix to solve the problem with double-rendering of a discussion feed
  const renderDiscussionWithDelay = useCallback(() => {
    setTimeout(() => {
      setRender(true);
    }, 100);
  }, []);

  useEffect(() => {
    renderDiscussionWithDelay();
  }, []);

  if (!render) return null;

  return (
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
  );
};

export default Discus;
