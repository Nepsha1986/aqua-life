"use client";

import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";

import Hit from "./Hit";

import "./styles.css";

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_APP_ID as
  | string
  | "";
const algoliaKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string | "";

const client = algoliasearch(algoliaAppId, algoliaKey);

interface Props {
  index: string;
}

const AlgoSearch = ({index}: Props) => {
  return (
    <InstantSearch indexName={index} searchClient={client}>
      <Configure hitsPerPage={5} />
      <div>
        <SearchBox />
        <Hits hitComponent={Hit as any} />
      </div>
    </InstantSearch>
  );
};

export default AlgoSearch;
