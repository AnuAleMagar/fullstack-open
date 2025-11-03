import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});
export const setNotificationFromThunk = (content,time) => {
  return async (dispatch) => {
    dispatch(setNotification(content));
    if (window.notificationTimeout) {
      clearTimeout(window.notificationTimeout);
    }
    window.notificationTimeout = setTimeout(() => {
      dispatch(removeNotification());
    }, time);
  };
}
export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
