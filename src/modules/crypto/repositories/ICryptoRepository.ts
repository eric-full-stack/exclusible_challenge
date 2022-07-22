import Crypto from '../infra/typeorm/entities/Crypto';

import IFindCryptoByPairDTO from '../dtos/IFindCryptoByPairDTO';
import IFindCryptoByIdDTO from '../dtos/IFindCryptoByIdDTO';
import ICreateCryptoDTO from '../dtos/ICreateCryptoDTO';

export default interface ICryptoRepository {
  create(data: ICreateCryptoDTO): Promise<Crypto>;

  findAll(): Promise<Crypto[] | null>;

  findById(query: IFindCryptoByIdDTO): Promise<Crypto | null>;

  findByPair(query: IFindCryptoByPairDTO): Promise<Crypto | null>;

  save(user: Crypto): Promise<Crypto>;

  remove(user: Crypto): Promise<void>;
}
