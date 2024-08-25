import React, { useState } from "react";
import "./LoginForm.css"; // Make sure to import the CSS stylesheet
import LoginForm from "./login";
import SignUpForm from "./signUp";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => setIsSignup(!isSignup);

  return (
    <div className="login-page">
      <div className="login-section">
        <div className="login-container">
          <div className="login-row">
            <div className="login-col text-center">
              <div className="login-section text-center">
                <h6
                  className="mb-0 pb-3"
                  style={{
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  <span onClick={!isSignup ? null : toggleForm}>Log In </span>
                  <span onClick={isSignup ? null : toggleForm}>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  checked={isSignup}
                  onChange={toggleForm}
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap">
                  <div className="card-3d-wrapper">
                    {isSignup ? <SignUpForm /> : <LoginForm />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
