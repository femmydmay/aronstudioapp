import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const waitForUser = () => {
  return new Promise<any>((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
};