"use client";

import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";

import Hit from "@/containers/Search/AlgoSearch/Hit/Hit";

const client = algoliasearch("40A0Y9MH0P", "fbf610a276b720e7eb4b075523be6374");

const AlgoSearch = () => {
  return (
    <InstantSearch indexName="temp" searchClient={client}>
      <Configure hitsPerPage={5} />
      <div className="ais-InstantSearch">
        <SearchBox />
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
};

export default AlgoSearch;
