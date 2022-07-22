import { inject, injectable } from 'tsyringe';

import Crypto from '@modules/crypto/infra/typeorm/entities/Crypto';

import ICryptoRepository from '../repositories/ICryptoRepository';

@injectable()
class ListCryptosService {
  constructor(
    @inject('CryptoRepository')
    private cryptoRepository: ICryptoRepository,
  ) {}

  public async execute(): Promise<Crypto[] | null> {
    const crypto = await this.cryptoRepository.findAll();

    return crypto;
  }
}

export default ListCryptosService;
