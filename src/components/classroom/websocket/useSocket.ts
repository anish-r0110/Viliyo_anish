
import { LIVESESSION_SOCKET_URL } from '@/config/socket';
import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import eventHandler from './eventHandler';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


let socket: Socket | undefined;

const useSocket = ( ) => {

  const { roomId } = useSelector((state:RootState)=> state.live.settings)

  useEffect(() => {
    if (!socket) {
      socket = io( LIVESESSION_SOCKET_URL , {
        secure: true,
        query: { room: roomId },
      });

      socket.on('connect', () => {
        console.log('Socket connected with id:', socket!.id);
      });

      socket.on('message', eventHandler);
    } else {
      // Re-attach eventHandler if socket already exists
      socket.on('message', eventHandler);
    }

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off('message', eventHandler);
      }
    };
  }, [roomId]);

  const sendMessage = (payload: any) => {
    if (socket) {
      socket.emit('message', JSON.stringify(payload));
    }
  };

  return { socket, sendMessage };
};

export default useSocket;
