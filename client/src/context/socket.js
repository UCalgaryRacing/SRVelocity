import React from 'react';
import socketio from 'socket.io-client';

//TODO: replce server variable
export const socket = socketio.connect('http://localhost:5500');
export const SocketContext = React.createContext();
