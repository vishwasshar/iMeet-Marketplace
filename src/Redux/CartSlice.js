import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload.id);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state.splice(index, 1);
    },
    removeAllItems: (state, action) => {
      state.splice(0, state.length);
    },
  },
});

export const CartReducer = CartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  removeAllItems,
} = CartSlice.actions;
