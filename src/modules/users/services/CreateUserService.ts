import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    type,
  }: ICreateUserDTO): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail({ email });

    if (emailExists) {
      throw new AppError('Email already in use.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      type,
    });

    return user;
  }
}
