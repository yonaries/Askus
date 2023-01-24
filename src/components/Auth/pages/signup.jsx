import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUpWithEmail from "../functions/signup-with";
import "./style.css";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const promise = await SignUpWithEmail(email, password, username);
      promise && navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <div className="container">
          <div className="card">
            <div className="card_title">
              <h1>Create Account</h1>
              <span>
                Already have an account?{" "}
                <a onClick={() => navigate("/signin")}>Sign In</a>
              </span>
            </div>
            <div className="form">
              <form onSubmit={submitHandler}>
                <input
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={submitHandler}
                  style={
                    loading ? { opacity: "0.5", pointerEvents: "none" } : {}
                  }
                >
                  {loading ? `Signing up` : "Sign up"}
                </button>
              </form>
            </div>
            <div className="card_title">
              <span>
                Do you want to visit without Account?
                <a onClick={() => navigate("/")}>Visit</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
