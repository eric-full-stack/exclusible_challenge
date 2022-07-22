import { v4 } from 'uuid';

import ICryptoRepository from '@modules/crypto/repositories/ICryptoRepository';

import ICreateCryptoDTO from '@modules/crypto/dtos/ICreateCryptoDTO';
import IFindCryptoByIdDTO from '@modules/crypto/dtos/IFindCryptoByIdDTO';
import IFindCryptoByPairDTO from '@modules/crypto/dtos/IFindCryptoByPairDTO';

import Crypto from '../../infra/typeorm/entities/Crypto';

class FakeCryptoRepository implements ICryptoRepository {
  private cryptos: Crypto[] = [];

  public async create(data: ICreateCryptoDTO): Promise<Crypto> {
    const crypto = new Crypto();

    Object.assign(crypto, { id: v4() }, data);

    this.cryptos.push(crypto);

    return crypto;
  }

  public async save(crypto: Crypto): Promise<Crypto> {
    const findIndex = this.cryptos.findIndex(
      cryptoToFind => cryptoToFind.id === crypto.id,
    );

    this.cryptos[findIndex] = crypto;

    return crypto;
  }

  public async remove(crypto: Crypto): Promise<void> {
    const removeIndex = this.cryptos.findIndex(
      cryptoToRemove => cryptoToRemove.id === crypto.id,
    );

    this.cryptos.splice(removeIndex, 1);
  }

  public async findById(query: IFindCryptoByIdDTO): Promise<Crypto | null> {
    const crypto = this.cryptos.find(
      cryptoToFind => cryptoToFind.id === query.id,
    );

    return crypto === undefined ? null : crypto;
  }

  public async findByPair(query: IFindCryptoByPairDTO): Promise<Crypto | null> {
    const crypto = this.cryptos.find(
      cryptoToFind => cryptoToFind.pair === query.pair,
    );

    return crypto === undefined ? null : crypto;
  }

  // Below was buggy since crypto type in this query comes in a hard format to filter
  // so I just made return all cryptos, not so many problems yet. I may fix in later tests
  // if it proves to be a problem
  public async findAll(): Promise<Crypto[]> {
    return this.cryptos;
  }
}

export default FakeCryptoRepository;
