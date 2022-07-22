import { Request, Response } from 'express';
import { container } from 'tsyringe';
import axios from 'axios';

import CreateCryptoService from '@modules/crypto/services/CreateCryptoService';
import UpdateCryptoService from '@modules/crypto/services/UpdateCryptoService';
import DeleteCryptoService from '@modules/crypto/services/DeleteCryptoService';
import ListCryptoService from '@modules/crypto/services/ListCryptoService';
import ListCryptosService from '@modules/crypto/services/ListCryptosService';
import { instanceToInstance } from 'class-transformer';
import UpdateCryptoRateByPairService from '@modules/crypto/services/UpdateCryptoRateByPairService';

export default class CryptosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCrypto = container.resolve(ListCryptosService);

    const crypto = await listCrypto.execute();

    return response.json(instanceToInstance(crypto));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { pair, spread } = request.body;

    const createCrypto = container.resolve(CreateCryptoService);

    const crypto = await createCrypto.execute({
      pair,
      spread,
    });

    return response.json(instanceToInstance(crypto));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCrypto = container.resolve(ListCryptoService);

    const crypto = await listCrypto.execute(id);

    return response.json(instanceToInstance(crypto));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { pair, spread, rate } = request.body;

    const updateCrypto = container.resolve(UpdateCryptoService);

    const crypto = await updateCrypto.execute({
      id,
      pair,
      spread,
      rate,
    });

    return response.json(instanceToInstance(crypto));
  }

  public async updateRateCMC(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { pair } = request.body;
    const [symbol, convert] = pair.split('/');
    const updateCrypto = container.resolve(UpdateCryptoRateByPairService);

    const CMCData = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?convert=${convert}&symbol=${symbol}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY || '',
        },
      },
    );

    const cryptoData = CMCData.data;
    if (cryptoData.status.error_code === 0) {
      const rate = cryptoData.data[symbol][0].quote[convert].price;
      await updateCrypto.execute({ pair, rate });
    }

    return response.status(204).send({ success: true });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCrypto = container.resolve(DeleteCryptoService);

    await deleteCrypto.execute(id);

    return response.json(204).send();
  }
}
