import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  cart: {
    _id: "",
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cart._id = action.payload?.id;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // builder.addCase(fetchAccount.pending, (state, action) => {});
    // builder.addCase(fetchAccount.fulfilled, (state, action) => {});
    // builder.addCase(fetchAccount.rejected, (state, action) => {});
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
