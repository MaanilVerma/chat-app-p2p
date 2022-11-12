import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

export const defaultStorage = getStorage(app);

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});
