import WebSocket, { Data } from 'ws';
import WsAuth from './middlewares/WsAuth';
import * as http from 'http';
import KrakenWebsocket from '@modules/crypto/infra/ws/Kraken';

function onError(ws: WebSocket, err: Error) {
  console.error(`onError: ${err.message}`);
}

function onMessage(ws: WebSocket, data: Data) {
  console.log(`onMessage: ${data}`);
}

async function onConnection(ws: WebSocket) {
  ws.on('message', data => onMessage(ws, data));
  ws.on('error', error => onError(ws, error));
  KrakenWebsocket(ws);
}

export default async (server: http.Server) => {
  const wss = new WebSocket.Server({
    server,
    path: '/cryptoRate',
    verifyClient: WsAuth,
  });

  wss.on('connection', onConnection);

  console.log(`🚀 Websocket Server started on port ${process.env.PORT}!`);
};
