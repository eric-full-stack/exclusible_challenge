import ListCryptoByPairService from '@modules/crypto/services/ListCryptoByPairService';
import ListCryptosService from '@modules/crypto/services/ListCryptosService';
import { container } from 'tsyringe';
import { WebSocket as WS, type WebSocket } from 'ws';

export default function KrakenWebsocket(wsServer: WebSocket) {
  let ws: WebSocket;

  ws = new WS('wss://ws.kraken.com/');
  ws.on('open', onOpen);
  ws.on('close', () => console.log('kraken closed'));
  wsServer.on('close', onClose);
  async function onClose() {
    ws.close();
  }
  async function onOpen() {
    ws.on('message', onMessage);

    const listAll = container.resolve(ListCryptosService);
    const cryptos = await listAll.execute();
    const pairs =
      cryptos?.map(crypto => `"${crypto.pair}"`).join(',') || 'BTC/USD';
    const subscription = `{ "event": "subscribe", "subscription": { "name": "ticker" }, "pair": [${pairs}]}`;

    ws.send(subscription);
  }

  async function onMessage(wsMsg: string) {
    const parsed = JSON.parse(wsMsg);
    if (Array.isArray(parsed)) {
      //cached request
      const getCrypto = container.resolve(ListCryptoByPairService);
      const price = Number(parsed[1].a[0]);
      const pair = parsed[3];
      const crypto = await getCrypto.execute(pair);
      wsServer.send(
        `{"pair": ${pair}, "rate": ${
          price + price * ((crypto?.spread || 0) / 100)
        }}`,
      );
    }
  }
}
