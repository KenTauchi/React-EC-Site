import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  // the whitelist array holds the name of the recuder that needs to be sotred in the local storage
};

// export default combineReducers({
//   user: userReducer,
//   cart: cartReducer,
// });

//===================================================================

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// this is used when there is a need to maintain data across session
// ====================================================================

export default persistReducer(persistConfig, rootReducer);
