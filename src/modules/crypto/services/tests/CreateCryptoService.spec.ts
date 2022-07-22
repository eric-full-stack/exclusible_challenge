import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeCryptoRepository from '../../repositories/fakes/FakeCryptoRepository';

import CreateCryptoService from '../CreateCryptoService';

let fakeCryptoRepository: FakeCryptoRepository;
let createCrypto: CreateCryptoService;

describe('CreateCrypto', () => {
  beforeEach(() => {
    fakeCryptoRepository = new FakeCryptoRepository();

    createCrypto = new CreateCryptoService(fakeCryptoRepository);
  });

  it('should be able to create an crypto', async () => {
    const btc = await fakeCryptoRepository.create({
      pair: 'BTC/USD',
      spread: 10,
    });

    const eth = await createCrypto.execute({
      pair: 'ETH/USD',
      spread: 5,
    });

    expect(btc).toHaveProperty('id');
    expect(btc.pair).toBe('BTC/USD');

    expect(eth).toHaveProperty('id');
    expect(eth.spread).toBe(5);
  });

  it('should not be able to create an crypto with an existing pair', async () => {
    await fakeCryptoRepository.create({
      pair: 'ETH/USD',
      spread: 5,
    });

    await expect(
      createCrypto.execute({
        pair: 'ETH/USD',
        spread: 15,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
