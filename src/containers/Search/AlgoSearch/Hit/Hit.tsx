import { Highlight } from "react-instantsearch";
import { getPropertyByPath } from "instantsearch.js/es/lib/utils";

const Hit = ({ hit }) => {
  return (
    <article>
      <img src={hit.imgUrl} />
      <div className="hit-title">
        <Highlight attribute="title" hit={hit} />
      </div>
      <div className="hit-excerpt">
        <Highlight attribute="excerpt" hit={hit} />
      </div>
    </article>
  );
};

export default Hit;
