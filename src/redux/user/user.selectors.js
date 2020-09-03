import { createSelector } from "reselect";

const selectUser = (reducer) => reducer.user;
const selectCart = (reducer) => reducer.cart;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
  //  the first arguement above takes the whole cart reducer as defined in the line3.
  // the returned value of the first argument is set as a parameter of the function which is passed as the second argument.
  // If there are not any changes in the first argument, the function passed as the second argument will not return anything.
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// export const selectCartItemsCount = createSelector(
//   [selectCartItems],
//   (cartItems) =>
//     cartItems.reduce(
//       (accumulatedQuantity, cartItem) =>
//         accumulatedQuantity + cartItem.quantity,
//       0
//     )
// );
