import { createSelector } from "reselect";

const selectCart = (reducer) => reducer.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
  //  the first arguement above takes the whole cart reducer as defined in the line3.
  // the returned value of the first argument is set as a parameter of the function which is passed as the second argument.
  // If there are not any changes in the first argument, the function passed as the second argument will not return anything.
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )

  // cartItem in the reduce function points each item in the curtItems array. reduce iterates each value in the array which is passes as a second parameter 'cartItem'
  // the first parameter 'accumulatedQuantity' is the result you want to get at the end.
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
