import { inject, injectable } from 'tsyringe';

import Crypto from '@modules/crypto/infra/typeorm/entities/Crypto';

import AppError from '@shared/errors/AppError';

import ICryptoRepository from '../repositories/ICryptoRepository';
import IUpdateCryptoRateByPairDTO from '../dtos/IUpdateCryptoRateByPairDTO';

@injectable()
export default class UpdateCryptoRateByPairService {
  constructor(
    @inject('CryptoRepository')
    private cryptoRepository: ICryptoRepository,
  ) {}

  public async execute({
    pair,
    rate,
  }: IUpdateCryptoRateByPairDTO): Promise<Crypto> {
    const crypto = await this.cryptoRepository.findByPair({ pair });

    if (!crypto) {
      throw new AppError('Crypto not found');
    }

    crypto.rate = rate ?? crypto.rate;

    await this.cryptoRepository.save(crypto);

    return crypto;
  }
}
