import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { socket } from "../../Utils/socketio";

const Notification = () => {
  const [notifications, setnotification] = useState([]);

  useEffect(() => {
    socket.on("friendRequest", (data) => {
      console.log(data);
      setnotification((prev) => [...prev, data]);
    });

    return ()=>{
        socket.off("friendRequest")
    }

  }, []);

  return (
    <>
      <div>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      {notifications.map((notif) => (
        <div key={notif.requestId} style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}>
          <strong>{notif.senderName}</strong> ({notif.senderEmail}) sent you a friend request.
        </div>
      ))}
    </div>
    </>
  );
};

export default Notification;
