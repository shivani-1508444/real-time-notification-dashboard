import React, { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../services/api.js";
import useSocket from "../hooks/useSocket.js";
import Toast from "../components/Toast.jsx";
import HistoryList from "../components/HistoryList.jsx";

function UserPanel() {
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load notification history."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleNewNotification = useCallback((notification) => {
    setToast(notification);

    setNotifications((oldNotifications) => [
      notification,
      ...oldNotifications
    ]);
  }, []);

  useSocket(handleNewNotification);

  return (
    <section className="page">
      <Toast
        notification={toast}
        onClose={() => setToast(null)}
      />

      <div className="page-heading">
        <p className="eyebrow">USER / RECEIVER</p>
        <h1>Notification Stream</h1>
        <p>
          Keep this page open to receive announcements in real time.
        </p>
      </div>

      <div className="connection-box">
        <span className="online-dot"></span>
        Real-time notifications are enabled
      </div>

      <div className="history-header">
        <div>
          <h2>History Logs</h2>
          <p>Previous announcements from MongoDB.</p>
        </div>

        <button className="secondary-btn" onClick={loadHistory}>
          Refresh History
        </button>
      </div>

      <HistoryList
        notifications={notifications}
        loading={loading}
        error={error}
      />
    </section>
  );
}

export default UserPanel;
