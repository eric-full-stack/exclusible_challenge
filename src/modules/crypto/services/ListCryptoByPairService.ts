import { inject, injectable } from 'tsyringe';

import Crypto from '@modules/crypto/infra/typeorm/entities/Crypto';

import ICryptoRepository from '../repositories/ICryptoRepository';

@injectable()
class ListCryptoByPairService {
  constructor(
    @inject('CryptoRepository')
    private cryptoRepository: ICryptoRepository,
  ) {}

  public async execute(pair: string): Promise<Crypto | null> {
    const crypto = await this.cryptoRepository.findByPair({
      pair,
    });

    return crypto;
  }
}

export default ListCryptoByPairService;
