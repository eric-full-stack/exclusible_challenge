import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeCryptoRepository from '../../repositories/fakes/FakeCryptoRepository';

import DeleteCryptoService from '../DeleteCryptoService';

let fakeCryptoRepository: FakeCryptoRepository;
let deleteCrypto: DeleteCryptoService;

describe('DeleteCrypto', () => {
  beforeEach(() => {
    fakeCryptoRepository = new FakeCryptoRepository();

    deleteCrypto = new DeleteCryptoService(fakeCryptoRepository);
  });

  it('should be able to delete an crypto', async () => {
    const btc = await fakeCryptoRepository.create({
      pair: 'BTC/USD',
      spread: 10,
    });

    expect(deleteCrypto.execute(btc.id)).resolves;
  });

  it('should not be able to delete a non-existing crypto', async () => {
    await expect(
      deleteCrypto.execute('non-existing-crypto-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
