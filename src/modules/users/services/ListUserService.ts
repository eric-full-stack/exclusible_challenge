import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User | null> {
    const user = await this.usersRepository.findById({
      id,
    });

    return user;
  }
}

export default ListUserService;
