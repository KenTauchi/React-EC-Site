import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
// this code above allows us to see the logger in the development environment only, not in the production environment

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
