import React from "react";

function Navbar({ page, setPage }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <h2>NotifyHub</h2>

        <div className="nav-buttons">
          <button
            className={page === "user" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("user")}
          >
            User Panel
          </button>

          <button
            className={page === "admin" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("admin")}
          >
            Admin Panel
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
