import 'reflect-metadata';

import FakeCryptoRepository from '../../repositories/fakes/FakeCryptoRepository';

import ListCryptosService from '../ListCryptosService';

let fakeCryptoRepository: FakeCryptoRepository;
let listCrypto: ListCryptosService;

describe('ListCrypto', () => {
  beforeEach(() => {
    fakeCryptoRepository = new FakeCryptoRepository();

    listCrypto = new ListCryptosService(fakeCryptoRepository);
  });

  it('should be able to lists all cryptos', async () => {
    const crypto1 = await fakeCryptoRepository.create({
      pair: 'BTC/USD',
      spread: 10,
    });

    const crypto2 = await fakeCryptoRepository.create({
      pair: 'ETH/USD',
      spread: 2,
    });

    const crypto3 = await fakeCryptoRepository.create({
      pair: 'BNB/USD',
      spread: 1,
    });

    const foundCrypto = await listCrypto.execute();

    expect(foundCrypto).toEqual(
      expect.arrayContaining([crypto1, crypto2, crypto3]),
    );
  });
});
