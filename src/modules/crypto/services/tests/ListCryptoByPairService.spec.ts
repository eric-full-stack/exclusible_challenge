import 'reflect-metadata';

import FakeCryptoRepository from '../../repositories/fakes/FakeCryptoRepository';

import ListCryptoByPairService from '../ListCryptoByPairService';

let fakeCryptoRepository: FakeCryptoRepository;
let listCrypto: ListCryptoByPairService;

describe('ListCryptoByPair', () => {
  beforeEach(() => {
    fakeCryptoRepository = new FakeCryptoRepository();

    listCrypto = new ListCryptoByPairService(fakeCryptoRepository);
  });

  it('should be able to list crypto by pair', async () => {
    const crypto = await fakeCryptoRepository.create({
      pair: 'ETH/USD',
      spread: 2,
    });

    const foundCrypto = await listCrypto.execute(crypto.pair);

    expect(foundCrypto).toEqual(crypto);
  });
});
