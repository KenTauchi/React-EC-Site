import { createSelector } from "reselect";

import memoize from "lodash.memoize";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
  // key is a property in an object. Object.keys returns its object property only in an array ie.['hats', 'sneakers',etc...]
  // then map the array to make it possible to access to each item in each category. Ex) collections[hat]
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);
