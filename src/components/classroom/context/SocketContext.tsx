// SocketContext.tsx
import { LIVESESSION_SOCKET_URL } from '@/config/socket';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  roomId: string;
  setRoomId: (roomId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};


interface Props {
  children:ReactNode
}

export const SocketProvider = ({ children }:Props) => {
  const [roomId, setRoomId] = useState<string>('');
  const socketRef = useRef<Socket | null>(null);


  return (
    <SocketContext.Provider value={{ socket: socketRef.current, roomId, setRoomId }}>
      {children}
    </SocketContext.Provider>
  );
};
