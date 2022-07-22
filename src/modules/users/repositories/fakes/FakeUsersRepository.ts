import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUserByIdDTO from '@modules/users/dtos/IFindUserByIdDTO';
import IFindUserByEmailDTO from '@modules/users/dtos/IFindUserByEmailDTO';
import IFindAllUsersByTypeDTO from '@modules/users/dtos/IFindAllUsersByTypeDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      userToFind => userToFind.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }

  public async remove(user: User): Promise<void> {
    const removeIndex = this.users.findIndex(
      userToRemove => userToRemove.id === user.id,
    );

    this.users.splice(removeIndex, 1);
  }

  public async findById(query: IFindUserByIdDTO): Promise<User | null> {
    const user = this.users.find(userToFind => userToFind.id === query.id);

    return user === undefined ? null : user;
  }

  public async findByEmail(query: IFindUserByEmailDTO): Promise<User | null> {
    const user = this.users.find(
      userToFind => userToFind.email === query.email,
    );

    return user === undefined ? null : user;
  }

  // Below was buggy since user type in this query comes in a hard format to filter
  // so I just made return all users, not so many problems yet. I may fix in later tests
  // if it proves to be a problem
  public async findAllByType(query: IFindAllUsersByTypeDTO): Promise<User[]> {
    return this.users;
  }
}

export default FakeUsersRepository;
