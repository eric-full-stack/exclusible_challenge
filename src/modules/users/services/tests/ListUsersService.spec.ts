import 'reflect-metadata';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import ListUsersService from '../ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to lists all users', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass',
      type: 'default',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe2',
      email: 'johndoe@e6xample.com',
      password: 'pass',
      type: 'admin',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'John Doe3',
      email: 'johndo2e@example.com',
      password: 'pass',
      type: 'admin',
    });

    const foundUsers = await listUsers.execute();

    expect(foundUsers).toEqual(expect.arrayContaining([user1, user2, user3]));
  });
});
