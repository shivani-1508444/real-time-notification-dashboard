import React, { useEffect } from "react";

function Toast({ notification, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) {
    return null;
  }

  return (
    <div className="toast">
      <div>
        <strong>🔔 New Announcement</strong>
        <p>{notification.message}</p>
      </div>

      <button onClick={onClose}>×</button>
    </div>
  );
}

export default Toast;
