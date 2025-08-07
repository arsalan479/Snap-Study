import { useMemo } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  const socket = useMemo(
    () => io("http://localhost:3000", { withCredentials: true }),
    []
  );
  return socket;
}
