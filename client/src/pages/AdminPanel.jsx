import React, { useState } from "react";
import { sendNotification } from "../services/api.js";

function AdminPanel() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("");
    setError("");

    if (!message.trim()) {
      setError("Announcement cannot be empty.");
      return;
    }

    if (message.trim().length > 500) {
      setError("Announcement cannot be more than 500 characters.");
      return;
    }

    try {
      setLoading(true);

      const data = await sendNotification(message.trim());

      setStatus(data.message);
      setMessage("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send announcement. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">ADMIN / SENDER</p>
        <h1>Broadcast Announcement</h1>
        <p>
          Send one announcement to every currently connected user.
        </p>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="message">Announcement</label>

          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your announcement here..."
            maxLength={500}
            rows="7"
          />

          <div className="character-count">
            {message.length}/500
          </div>

          <button className="primary-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Announcement"}
          </button>
        </form>

        {status && <div className="success-box">{status}</div>}
        {error && <div className="error-box">{error}</div>}
      </div>

      <div className="info-card">
        <h3>How it works</h3>
        <p>
          The announcement is first saved in MongoDB. After saving,
          the backend emits a Socket.io event to all connected users.
        </p>
      </div>
    </section>
  );
}

export default AdminPanel;
