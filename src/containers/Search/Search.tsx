"use client";
import { useState } from "react";

import Dialog from "@/components/Dialog/Dialog";
import AlgoSearch from "./AlgoSearch";

const Search = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(true);
  };

  return (
    <>
      <button onClick={handleClick}>Search</button>

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
