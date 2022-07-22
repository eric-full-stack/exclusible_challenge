import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import DeleteUserService from '../DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUser = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete an user', async () => {
    const admin = await fakeUsersRepository.create({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'adminpass',
      type: 'admin',
    });

    await expect(deleteUser.execute(admin.id)).resolves;
  });

  it('should not be able to delete a non-existing user', async () => {
    await expect(
      deleteUser.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
