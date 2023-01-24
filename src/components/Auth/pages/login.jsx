import { FormEvent, useState } from "react";
import "../css/login.css";

import emailIcon from "../../assets/icons/email.svg";
import passwordIcon from "../../assets/icons/key.svg";
import githubLogo from "../../assets/logos/github.png";
import googleLogo from "../../assets/logos/google.png";

import Notify from "../toast-message";
import { AuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Github, Google } from "../../../firebase/OAuth2-Providers";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmail, signInWithProvider } = useAuth();

  async function signinHandler(event, provider) {
    event.preventDefault();
    try {
      const promise =
        provider === "email"
          ? signInWithEmail(email, password)
          : signInWithProvider(provider);

      await Notify({
        toastMessage: "Authenticating...",
        toastType: "wait",
        waitingFor: promise,
      });
    } catch (error) {
      console.log(`At login page: ${error}`);
    }
  }

  return (
    <div className="main-container">
      <div className="login-panel">
        <div className="signIn-with-others">
          <button
            className="signIn-google"
            onClick={(e) => signinHandler(e, Github)}
          >
            <img src={githubLogo} alt="sign in with github" />
            Sign In with GitHub
          </button>
          <button
            className="signIn-google"
            onClick={(e) => signinHandler(e, Google)}
          >
            <img src={googleLogo} alt="sign in with google" />
            Sign In with Google
          </button>
        </div>
        <div className="divider">
          <hr />
          <div className="or">OR</div>
          <hr />
        </div>
        <form onSubmit={(e) => signinHandler(e, "email")}>
          <div className="signIn-with-email">
            <div className="Inputs">
              <div className="input">
                <img src={emailIcon} alt="" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  id="emailInput"
                />
              </div>
              <div className="input">
                <img src={passwordIcon} alt="" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  id="passwordInput"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="signIn-btn">
            Login
          </button>
        </form>
        <p>
          Don't have cyllo? <a href="/signup">Signup</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
