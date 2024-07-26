"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Dialog from "@/components/Dialog/Dialog";
import Button from "@/components/Button/Button";
import AlgoSearch from "./AlgoSearch";
import { useLocale, t } from "@/i18n";

const Search = () => {
  const { dictionary, locale } = useLocale();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(true);
  };

  useEffect(() => {
    setActive(false);
  }, [pathname]);

  return (
    <>
      <Button size="md" onClick={handleClick}>
        {t(dictionary.common.search)}
      </Button>

      <Dialog
        size="large"
        heading="Search documentation"
        open={active}
        onClickClose={() => setActive(false)}
      >
        <AlgoSearch index={`${locale}_fishes`} />
      </Dialog>
    </>
  );
};

export default Search;
