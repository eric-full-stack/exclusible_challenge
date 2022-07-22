import 'reflect-metadata';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import ListUserService from '../ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUser: ListUserService;

describe('ListUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUser = new ListUserService(fakeUsersRepository);
  });

  it('should be able to list user by id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass',
      type: 'default',
    });

    const foundUser = await listUser.execute(user.id);

    expect(foundUser).toEqual(user);
  });
});
