"use client";
import { useState } from "react";

import Dialog from "@/components/Dialog/Dialog";
import Button from "@/components/Button/Button";
import AlgoSearch from "./AlgoSearch";
import { useLocale, t } from "@/i18n";

const Search = () => {
  const { dictionary } = useLocale();
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(true);
  };

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
        <AlgoSearch />
      </Dialog>
    </>
  );
};

export default Search;
