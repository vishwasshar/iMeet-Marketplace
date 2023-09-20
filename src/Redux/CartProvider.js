import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";

const CartProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default CartProvider;
