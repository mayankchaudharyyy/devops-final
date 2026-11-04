import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './useAuth';

const getSocketUrl = () => {
  const envUrl = import.meta.env.VITE_SOCKET_URL;
  if (envUrl && envUrl !== '/') {
    return envUrl;
  }
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  return typeof window !== 'undefined' ? window.location.origin : '/';
};

const SOCKET_URL = getSocketUrl();

export function useSocket() {
  const { token } = useAuth();

  const socket = useMemo(() => {
    if (!token) return null;
    return io(SOCKET_URL, { auth: { token }, transports: ['websocket'] });
  }, [token]);

  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  return {
    socket,
    joinRoom: (rfqId) => socket?.emit('join_rfq_room', rfqId),
    leaveRoom: (rfqId) => socket?.emit('leave_rfq_room', rfqId),
    onEvent: (event, handler) => socket?.on(event, handler),
    offEvent: (event, handler) => socket?.off(event, handler)
  };
}
