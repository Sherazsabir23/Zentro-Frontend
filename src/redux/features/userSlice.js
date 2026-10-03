import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // abhi ek single user rakhenge (object), tum chaaho to array bhi rakh sakte ho
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // payload me user ka data aayega
    },
    logout: (state) => {
      state.user = null;
    },
  
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
