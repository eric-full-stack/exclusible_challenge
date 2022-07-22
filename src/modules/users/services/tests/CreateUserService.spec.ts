import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create an user', async () => {
    const admin = await fakeUsersRepository.create({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'adminpass',
      type: 'admin',
    });

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'somepass',
      type: 'default',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');

    expect(admin).toHaveProperty('id');
    expect(admin.name).toBe('admin');
  });

  it('should not be able to create an user with an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'somepass',
      type: 'default',
    });

    await expect(
      createUser.execute({
        name: 'User',
        email: 'johndoe@example.com',
        password: 'somepass',
        type: 'default',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
