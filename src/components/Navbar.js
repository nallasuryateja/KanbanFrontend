// // Navbar.js
// import React from "react";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     window.location.href = "/login";
//   };

//   return (
//     <nav
//       style={{
//         padding: "10px",
//         backgroundColor: "gray",
//         color: "white",
//         display: "flex",
//         justifyContent: "space-between",
//       }}
//     >
//       <h2>Kanban App</h2>
//       <button
//         onClick={handleLogout}
//         style={{
//           backgroundColor: "#dc3545",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           padding: "10px 15px",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css"; // Import the CSS file

// You can use FontAwesome or other icon libraries.
// Make sure you've installed FontAwesome using npm: `npm install font-awesome`
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">Kanban App</h2>
      <button onClick={handleLogout} className="logout-button">
        <FaSignOutAlt className="logout-icon" />
      </button>
    </nav>
  );
};

export default Navbar;
