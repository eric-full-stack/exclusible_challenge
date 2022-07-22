import { inject, injectable } from 'tsyringe';

import Crypto from '@modules/crypto/infra/typeorm/entities/Crypto';

import AppError from '@shared/errors/AppError';

import ICryptoRepository from '../repositories/ICryptoRepository';
import IUpdateCryptoDTO from '../dtos/IUpdateCryptoDTO';

@injectable()
export default class UpdateCryptoService {
  constructor(
    @inject('CryptoRepository')
    private cryptoRepository: ICryptoRepository,
  ) {}

  public async execute({
    id,
    pair,
    spread,
    rate,
  }: IUpdateCryptoDTO): Promise<Crypto> {
    const crypto = await this.cryptoRepository.findById({ id });

    if (!crypto) {
      throw new AppError('Crypto not found');
    }

    const pairExists =
      pair !== crypto.pair &&
      (await this.cryptoRepository.findByPair({ pair }));

    if (pairExists) {
      throw new AppError('Pair already exists.');
    }

    crypto.pair = pair ?? crypto.pair;
    crypto.spread = spread ?? crypto.spread;
    crypto.rate = rate ?? crypto.rate;

    await this.cryptoRepository.save(crypto);

    return crypto;
  }
}
