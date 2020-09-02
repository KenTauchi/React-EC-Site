import React from "react";
import "./collection-item.styles.scss";

import CustomButton from "../custom-button/custom-button";

import { connect } from "react-redux";
import { addItem as importedAddItem } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, addItem }) => {
  // addItem here is this.props.addItem, and referes to the addItem property inside the mapDispatchToProps function
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(importedAddItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
