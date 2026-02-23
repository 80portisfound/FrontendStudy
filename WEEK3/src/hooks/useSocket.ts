import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message, User } from '../types/message';

const SERVER_URL = 'http://localhost:3000';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState<Message | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userJoined, setUserJoined] = useState<string | null>(null);
  const [userLeft, setUserLeft] = useState<string | null>(null);

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

    socket.on('receiveMessage', (data: Message) => {
      console.log('Received:', data);
      setIncomingMessage(data);
    });

    socket.on('userList', (userList: User[]) => {
      console.log('User list updated:', userList);
      setUsers(userList);
    });

    socket.on('userJoined', (username: string) => {
      console.log('User joined:', username);
      setUserJoined(username);
    });

    socket.on('userLeft', (username: string) => {
      console.log('User left:', username);
      setUserLeft(username);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = useCallback((message: Message) => {
    socketRef.current?.emit('sendMessage', message);
  }, []);

  const join = useCallback((username: string) => {
    socketRef.current?.emit('join', username);
  }, []);

  return { socket: socketRef.current, isConnected, sendMessage, incomingMessage, users, join, userJoined, userLeft };
}
