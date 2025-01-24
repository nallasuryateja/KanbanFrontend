// // Updated Login.js
// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//     navigate("/");
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginTop: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginTop: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Track whether it's signup or login
  const { login, signup } = useAuth(); // Include login and signup from AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(email, password);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="switch-auth">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsSignup(false)} className="auth-link">
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsSignup(true)} className="auth-link">
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
