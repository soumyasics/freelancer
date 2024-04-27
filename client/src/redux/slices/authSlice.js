import { createSlice } from "@reduxjs/toolkit";
import {getDataFromLocalStorage} from "../../utils/getDataFromLs/getDataFromLs";
const initialState = {
  isUserLoggedIn: false,
  userId: null,
  userType: null,
  userData: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState: getDataFromLocalStorage() || initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { userId, userType, userData } = action.payload;
      state.isUserLoggedIn = true;
      state.userId = userId;
      state.userType = userType;
      state.userData = userData;
    },

    logoutSuccess: (state) => {
      state.isUserLoggedIn = false;
      state.userId = null;
      state.userType = null;
      state.userData = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
