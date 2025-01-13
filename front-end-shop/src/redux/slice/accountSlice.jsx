import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callAccount } from "../../config/api";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async () => {
    const response = await callAccount();
    return response.data;
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: "",
  user: {
    _id: "",
    name: "",
    email: "",
    isSeller: false,
    createdAt: "",
    phone: "",
    thumbnailURL: "",
    thumbnail_PublicID: "",
    addresses: [
      {
        _id: "",
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        default: false
      }
    ]
  }
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
    setLogoutAction: (state, action) => {
      localStorage.clear();
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false;
      state.errorRefreshToken = action.payload?.message ?? "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAccount.pending, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = true;
      }
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      console.log("🚀 ~ file: accountSlice.jsx ~ line 108 ~ builder.addCase ~ action", action)
      if (action.payload) {
        state.isAuthenticated = true;
        state.isLoading = false;

        state.user._id = action?.payload?._id;
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.user.phone = action.payload.phone;
        state.user.isSeller = action.payload.isSeller;
        state.user.thumbnailURL = action.payload.thumbnailURL || "http://res.cloudinary.com/ddrfocetn/image/upload/v1736180530/kq-shop/wqyattmg59aurbmkzzl8.jpg"; 
      }
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    });
  },
});

export const { setUserLoginInfo, setLogoutAction, setRefreshTokenAction } =
  accountSlice.actions;

export default accountSlice.reducer;
