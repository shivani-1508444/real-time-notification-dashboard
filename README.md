# Real-Time Event-Driven Broadcast Notification Dashboard

A simple MERN Stack project for sending announcements from an Admin panel and receiving them instantly on all connected User tabs using Socket.io.

## Features

- Admin can send announcements
- Real-time broadcast with Socket.io
- Custom toast notification
- MongoDB permanent notification history
- REST API for notification history
- User dashboard
- Multiple browser tabs receive the same notification
- Loading, empty and error states
- Basic input validation
- Responsive UI

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- dotenv
- cors

## Folder Structure

```text
real-time-notification-dashboard/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── NotificationCard.jsx
│   │   │   ├── HistoryList.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/
│   │   │   ├── AdminPanel.jsx
│   │   │   └── UserPanel.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── hooks/
│   │   │   └── useSocket.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── admin.css
│   │   │   ├── user.css
│   │   │   └── toast.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── notificationController.js
│   ├── models/
│   │   └── Notification.js
│   ├── routes/
│   │   └── notificationRoutes.js
│   ├── socket/
│   │   └── socketHandler.js
│   ├── middleware/
│   │   ├── validateNotification.js
│   │   └── errorHandler.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

## Setup

### 1. Install dependencies

From project root:

```bash
npm run install-all
```

Or install separately:

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Backend environment variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

### 3. Frontend environment variables

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Start backend

```bash
npm run server
```

### 5. Start frontend

Open another terminal:

```bash
npm run client
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

## API Endpoints

### Get notification history

```http
GET /api/notifications
```

### Send notification

```http
POST /api/notifications
Content-Type: application/json

{
  "message": "Server maintenance at 10 PM."
}
```

## Socket.io

Event name:

```text
notification:broadcast
```

Flow:

```text
Admin
  ↓
POST /api/notifications
  ↓
Save to MongoDB
  ↓
Socket.io emit
  ↓
All connected users
  ↓
Toast notification
```

## MongoDB Schema

```js
{
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

1. Open the application.
2. Open Admin panel.
3. Open User panel in 2-3 browser tabs.
4. Send an announcement from Admin.
5. All User tabs should immediately show the toast.
6. Refresh a User tab.
7. The announcement should still appear in History Logs.

## Demo

For the 2-minute demo:

- Show Admin panel
- Show multiple User tabs
- Send announcement
- Show instant toast on every tab
- Show MongoDB document
- Show History Logs
- Optionally show browser Network/Socket activity

## Screenshots

Add screenshots here before submitting the project.

## Demo Video

Add your demo video link here before submitting.
