"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Button, Dialog } from "@/ui";
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
      <Button size="md" onClick={handleClick} ghost>
        <FontAwesomeIcon icon={faSearch} />
        <span style={{ marginLeft: "10px" }}>
          {t(dictionary.common.search)}
        </span>
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
