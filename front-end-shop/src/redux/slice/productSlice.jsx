import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAccount = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await callAccount();
    return response.metadata;
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: "",
  user: {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    role: "",
  },
};

const productSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAccount.pending, (state, action) => {});

    builder.addCase(fetchAccount.fulfilled, (state, action) => {});

    builder.addCase(fetchAccount.rejected, (state, action) => {});
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
