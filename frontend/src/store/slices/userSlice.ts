import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  info: any | null;
}

const initialState: UserState = {
  info: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.info = action.payload;
    },
    clearUser(state) {
      state.info = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
