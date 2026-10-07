import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`
});

export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

export const sendNotification = async (message) => {
  const response = await api.post("/notifications", {
    message
  });

  return response.data;
};
