import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message } from '../types/message';

const SERVER_URL = 'http://localhost:3000';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState<Message | null>(null);

  useEffect(() => {
    const socket = io(SERVER_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
      setIsConnected(false);
    });

    socket.on('message', (data: Message) => {
      console.log('Received:', data);
      setIncomingMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = useCallback((message: Message) => {
    socketRef.current?.emit('message', message);
  }, []);

  return { socket: socketRef.current, isConnected, sendMessage, incomingMessage };
}
