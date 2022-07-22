import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    type,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById({ id });

    if (!user) {
      throw new AppError('User not found');
    }

    const emailExists =
      email !== user.email &&
      (await this.usersRepository.findByEmail({ email }));

    if (emailExists) {
      throw new AppError('Email already in use.');
    }

    const hashedPassword = password
      ? await this.hashProvider.generateHash(password)
      : user.password;

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = hashedPassword;
    user.type = type ?? user.type;

    await this.usersRepository.save(user);

    return user;
  }
}
