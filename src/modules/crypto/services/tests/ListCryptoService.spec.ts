import 'reflect-metadata';

import FakeCryptoRepository from '../../repositories/fakes/FakeCryptoRepository';

import ListCryptoService from '../ListCryptoService';

let fakeCryptoRepository: FakeCryptoRepository;
let listCrypto: ListCryptoService;

describe('ListCrypto', () => {
  beforeEach(() => {
    fakeCryptoRepository = new FakeCryptoRepository();

    listCrypto = new ListCryptoService(fakeCryptoRepository);
  });

  it('should be able to list crypto by id', async () => {
    const crypto = await fakeCryptoRepository.create({
      pair: 'ETH/USD',
      spread: 2,
    });

    const foundCrypto = await listCrypto.execute(crypto.id);

    expect(foundCrypto).toEqual(crypto);
  });
});
