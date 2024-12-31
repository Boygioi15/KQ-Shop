import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callAccount } from "../../config/api";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
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

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user._id = action?.payload?._id;
      state.user.email = action.payload.usr_email;
      state.user.name = action.payload.usr_name;
      state.user.role = action?.payload?.usr_role;
      state.user.avatar = action?.payload?.usr_avatar;
    },
    setLogoutAction: (state, action) => {
      localStorage.clear();
      state.isAuthenticated = false;
      state.user = {
        _id: "",
        email: "",
        name: "",
        role: {
          _id: "",
          name: "",
        },
      };
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
      if (action.payload) {
        state.isAuthenticated = true;
        state.isLoading = false;

        state.user._id = action?.payload?._id;
        state.user.email = action.payload.usr_email;
        state.user.name = action.payload.usr_name;
        state.user.role = action?.payload?.usr_role;
        state.user.avatar = action?.payload?.usr_avatar;
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
