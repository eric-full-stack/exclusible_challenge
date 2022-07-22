import { Repository } from 'typeorm';
import OrmConnection from '@shared/infra/typeorm';

import ICryptoRepository from '@modules/crypto/repositories/ICryptoRepository';

import Crypto from '../entities/Crypto';

import ICreateCryptoDTO from '@modules/crypto/dtos/ICreateCryptoDTO';
import IFindCryptoByIdDTO from '@modules/crypto/dtos/IFindCryptoByIdDTO';
import IFindCryptoByPairDTO from '@modules/crypto/dtos/IFindCryptoByPairDTO';

class CryptoRepository implements ICryptoRepository {
  private ormRepository: Repository<Crypto>;

  constructor() {
    this.ormRepository = OrmConnection.getRepository(Crypto);
  }

  public async create(data: ICreateCryptoDTO): Promise<Crypto> {
    const crypto = this.ormRepository.create(data);

    await this.ormRepository.save(crypto);

    return crypto;
  }

  public async save(crypto: Crypto): Promise<Crypto> {
    const updatedCrypto = await this.ormRepository.save(crypto);

    return updatedCrypto;
  }

  public async remove(crypto: Crypto): Promise<void> {
    await this.ormRepository.remove(crypto);
  }

  public async findById(query: IFindCryptoByIdDTO): Promise<Crypto | null> {
    const crypto = await this.ormRepository.findOne({
      where: { id: query.id },
    });

    return crypto;
  }

  public async findByPair(query: IFindCryptoByPairDTO): Promise<Crypto | null> {
    const crypto = await this.ormRepository.findOne({
      where: { pair: query.pair },
      cache: 60000,
    });

    return crypto;
  }

  public async findAll(): Promise<Crypto[] | null> {
    const cryptos = await this.ormRepository.find({ cache: 60000 });

    return cryptos;
  }
}

export default CryptoRepository;
