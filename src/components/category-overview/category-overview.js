import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../collection-preview/collection-preview";
import { selectCollectionForPreview } from "../../redux/shop/shop.selectors";

import "./category-overview.styles.scss";

const CategoryOverview = ({ collections }) => (
  <div className="category-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(CategoryOverview);
