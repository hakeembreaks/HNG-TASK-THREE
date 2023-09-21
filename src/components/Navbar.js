import React from "react";

import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext"; // Import the authentication context
import Temple from "../img/temple.svg";
import "./Navbar.css";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext(); // Access user state from the authentication context

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Breaks Nation</span>
        </li>
        {user ? (
          // Display Logout when the user is logged in
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}
