import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedin: false,
    isError: null,
  },
  reducers: {
    addUser: (state, action) => {
      (state.user = action.payload),
        (state.isLoggedin = true),
        (state.isError = null);
    },
    removeUser: () => {
      (state.user = action.payload),
        (state.isLoggedin = false),
        (state.isError = null);
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

const { addUser, removeUser, setError } = authSlice.actions;
export default authSlice.reducer;
