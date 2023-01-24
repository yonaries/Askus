import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../../config/firebaseConfig";

export class SignInWith {
  constructor() {}

  static async Provider(provider) {
    try {
      const userCredential = await signInWithPopup(auth, provider);

      toast.success(`Authenticated as ${userCredential.user.email}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: false,
      });
      return userCredential.user;
    } catch (error) {
      //   console.log(`Error: ${error}`);
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: false,
      });
      throw new Error(error.toString());
    }
  }

  static async Email(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await userCredential.user.getIdToken();
      toast.success(`Authenticated as ${userCredential.user.email}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: false,
      });

      return userCredential.user;
    } catch (error) {
      const message =
        error.code == "auth/user-not-found"
          ? "No user account found"
          : "Something went wrong";
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
}
