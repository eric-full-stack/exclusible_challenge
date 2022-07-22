import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICryptoRepository from '../repositories/ICryptoRepository';

@injectable()
class DeleteCryptoService {
  constructor(
    @inject('CryptosRepository')
    private cryptoRepository: ICryptoRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const crypto = await this.cryptoRepository.findById({ id });

    if (!crypto) {
      throw new AppError('Crypto not found.');
    }

    await this.cryptoRepository.remove(crypto);
  }
}

export default DeleteCryptoService;
