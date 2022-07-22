import { inject, injectable } from 'tsyringe';

import Crypto from '@modules/crypto/infra/typeorm/entities/Crypto';

import ICryptoRepository from '../repositories/ICryptoRepository';

@injectable()
class ListCryptoService {
  constructor(
    @inject('CryptoRepository')
    private cryptoRepository: ICryptoRepository,
  ) {}

  public async execute(id: string): Promise<Crypto | null> {
    const crypto = await this.cryptoRepository.findById({
      id,
    });

    return crypto;
  }
}

export default ListCryptoService;
