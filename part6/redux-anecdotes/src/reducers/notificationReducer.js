import { createSlice } from "@reduxjs/toolkit";
const initialState='Welcome to anecdotes'
const notificationSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});

export const { setNotification,removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
