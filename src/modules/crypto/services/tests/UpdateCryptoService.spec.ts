import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeCryptoRepository from '../../repositories/fakes/FakeCryptoRepository';

import UpdateCryptoService from '../UpdateCryptoService';

let fakeCryptoRepository: FakeCryptoRepository;
let updateCrypto: UpdateCryptoService;

describe('UpdateCrypto', () => {
  beforeEach(() => {
    fakeCryptoRepository = new FakeCryptoRepository();

    updateCrypto = new UpdateCryptoService(fakeCryptoRepository);
  });

  it('should be able to update an crypto', async () => {
    const btc = await fakeCryptoRepository.create({
      pair: 'BTC/USD',
      spread: 10,
    });

    const eth = await fakeCryptoRepository.create({
      pair: 'ETH/USD',
      spread: 5,
    });

    const updatedBtc = updateCrypto.execute({
      ...btc,
      id: btc.id,
      rate: 1000,
    });

    expect(btc).toHaveProperty('id');
    expect(btc.pair).toBe('BTC/USD');
    expect(btc.rate).toBe(1000);

    expect(eth).toHaveProperty('id');
    expect(eth.spread).toBe(5);
  });

  it('should not be able to update an crypto with an existing pair', async () => {
    await fakeCryptoRepository.create({
      pair: 'ETH/USD',
      spread: 5,
    });

    const btc = await fakeCryptoRepository.create({
      pair: 'BTC/USD',
      spread: 15,
    });

    await expect(
      updateCrypto.execute({
        ...btc,
        id: btc.id,
        pair: 'ETH/USD',
        spread: 15,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
