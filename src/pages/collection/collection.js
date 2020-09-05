import React from "react";
import "./collection.styles.scss";

import CollectionItem from "../../components/collection-item/collection-item";

import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";

const CollectionPage = ({ match, collection }) => {
  console.log("match2", match);
  console.log("collection", collection);
  return (
    <div className="category-page">
      <h2>Category Page</h2>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

// ownProps refers to the props in the CollectionPage component. the component is wrapped with <Route>, so 'match' can be retrieved after ownProps

export default connect(mapStateToProps)(CollectionPage);
