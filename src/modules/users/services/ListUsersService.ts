import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const users = await this.usersRepository.findAllByType({
      type: [{ type: 'admin' }, { type: 'default' }],
    });

    return users;
  }
}
