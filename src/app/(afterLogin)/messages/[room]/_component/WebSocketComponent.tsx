"use client";

import useSocket from "../_lib/useSocket";

export default function WebSocketComponent() {
  useSocket(); // 연결맺기
  return null;
}

