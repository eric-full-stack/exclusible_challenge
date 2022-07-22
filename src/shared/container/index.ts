import { container } from 'tsyringe';

import './providers';

// users imports
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
//crypto
import ICryptoRepository from '@modules/crypto/repositories/ICryptoRepository';
import CryptoRepository from '@modules/crypto/infra/typeorm/repositories/CryptoRepository';

// users registrations
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

// crypto registrations
container.registerSingleton<ICryptoRepository>(
  'CryptoRepository',
  CryptoRepository,
);
