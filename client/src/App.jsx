import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import UserPanel from "./pages/UserPanel.jsx";

function App() {
  const [page, setPage] = useState("user");

  return (
    <div>
      <Navbar page={page} setPage={setPage} />

      <main className="container">
        {page === "admin" ? <AdminPanel /> : <UserPanel />}
      </main>
    </div>
  );
}

export default App;