import { useEffect } from "react";
import { socket } from "../services/socket.js";

function useSocket(onNotification) {
  useEffect(() => {
    const handleNotification = (notification) => {
      onNotification(notification);
    };

    socket.on("notification:broadcast", handleNotification);

    return () => {
      socket.off("notification:broadcast", handleNotification);
    };
  }, [onNotification]);
}

export default useSocket;
