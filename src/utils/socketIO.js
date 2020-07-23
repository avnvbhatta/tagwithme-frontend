import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_ENDPOINT);
// const socket = null;


export default socket;