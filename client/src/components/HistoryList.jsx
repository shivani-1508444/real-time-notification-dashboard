import React from "react";
import NotificationCard from "./NotificationCard.jsx";
import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

function HistoryList({ notifications, loading, error }) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (notifications.length === 0) {
    return <div className="empty-state">No announcements yet.</div>;
  }

  return (
    <div className="history-list">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
        />
      ))}
    </div>
  );
}

export default HistoryList;
