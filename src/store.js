import { action, createStore, thunk } from "easy-peasy";

const store = createStore({
  auth: {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || "",
    signin: action((state, payload) => {
      state.userInfo = payload;
      state.isLoggedIn = true;
    }),
    signout: action((state, _) => {
      state.userInfo = "";
      state.isLoggedIn = false;
    }),
  },
  chats: {
    userId: "",
    userDetails: "",
    updateChatsUser: action((state, payload) => {
      state.userId = payload.contactId;
      state.userDetails = payload.profileDetails;
    }),
  },
});
export default store;
