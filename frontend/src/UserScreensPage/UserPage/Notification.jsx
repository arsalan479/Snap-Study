import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { socket } from "../../Utils/socketio.js";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const listener = (data) => {
      console.log("Received:", data);
      if (Array.isArray(data)) {
        setNotifications((prev) => [...prev, ...data]);
      } else {
        setNotifications((prev) => [...prev, data]);
      }
    };


    socket.on("newFriendRequest", listener);
    return () => {
      socket.off("newFriendRequest", listener);
    };
  }, []);

  useEffect(() => {
    console.log("Notifications updated:", notifications);
  }, [notifications]);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      {notifications.map((notif, idx) => (
        <div key={notif.requestId || idx} style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}>
          <strong>{notif.senderName}</strong> ({notif.senderEmail}) sent you a friend request.
        </div>
      ))}
    </div>
  );
};


export default Notification;
