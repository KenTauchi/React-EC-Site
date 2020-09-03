import React from "react";
import { connect } from "react-redux";

import CustomButton from "../../components/custom-button/custom-button";
import CartItem from "../../components/cart-item/cart-item";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { withRouter } from "react-router-dom";

import { createStructuredSelector } from "reselect";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  // the argument "dispatch" is included in the {...otherProps} deconstrcuted argument.
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
        // you can access to dispatch by passing it to argument without creating a mapDispatchToProps function.
      }}
    >
      Go To Checkout
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
