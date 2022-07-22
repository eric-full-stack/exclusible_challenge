import { inject, injectable } from 'tsyringe';

import Crypto from '@modules/crypto/infra/typeorm/entities/Crypto';

import AppError from '@shared/errors/AppError';

import ICryptoRepository from '../repositories/ICryptoRepository';
import ICreateCryptoDTO from '../dtos/ICreateCryptoDTO';

@injectable()
export default class CreateCryptoervice {
  constructor(
    @inject('CryptoRepository')
    private cryptoRepository: ICryptoRepository,
  ) {}

  public async execute({ pair, spread }: ICreateCryptoDTO): Promise<Crypto> {
    const pairExists = await this.cryptoRepository.findByPair({ pair });

    if (pairExists) {
      throw new AppError('Pair already exists.');
    }

    const crypto = await this.cryptoRepository.create({
      pair,
      spread,
    });

    return crypto;
  }
}
