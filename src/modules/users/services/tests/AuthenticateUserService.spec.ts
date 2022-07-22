import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from '../AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'somepass',
      type: 'default',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'somepass',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate an user with wrong email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'somepass',
      type: 'default',
    });

    await expect(
      authenticateUser.execute({
        email: 'wrongemail@example.com',
        password: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with a wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'somepass',
      type: 'default',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrongpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
