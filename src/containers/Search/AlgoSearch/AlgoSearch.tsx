"use client";

import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";

import Hit from "./Hit";

import "./styles.css";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);

const AlgoSearch = () => {
  return (
    <InstantSearch indexName="temp" searchClient={client}>
      <Configure hitsPerPage={5} />
      <div>
        <SearchBox />
        <Hits hitComponent={Hit as any} />
      </div>
    </InstantSearch>
  );
};

export default AlgoSearch;
