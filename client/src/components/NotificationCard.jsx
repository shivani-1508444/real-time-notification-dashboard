import React from "react";

function NotificationCard({ notification }) {
  const date = new Date(notification.createdAt);

  return (
    <div className="notification-card">
      <div>
        <span className="notification-icon">🔔</span>
        <strong>{notification.message}</strong>
      </div>

      <p>{date.toLocaleString()}</p>
    </div>
  );
}

export default NotificationCard;
