import React from "react";
import { Route } from "react-router-dom";

import CategoryOverview from "../../components/category-overview/category-overview";

import CollectionPage from "../collection/collection";

const ShopPage = ({ match }) => {
  console.log("match1", match);
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CategoryOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

// Route automatically returns the match poperty. ShopPage component gets a parameter match from the <route> in the App.js file.
// the string "/:collectionId" after math.path is set in the params poperty in side the match.

export default ShopPage;
