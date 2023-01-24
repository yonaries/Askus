import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const auth = getAuth();

export default function logOut() {
  signOut(auth)
    .then(() => {
      toast.info(`You are Logged out`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: false,
      });
    })
    .catch((error) => {
      toast.error(`Something went wrong can't Logout.`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: false,
      });
    });
}
