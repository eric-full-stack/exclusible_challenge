import { Repository } from 'typeorm';
import OrmConnection from '@shared/infra/typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUserByIdDTO from '@modules/users/dtos/IFindUserByIdDTO';
import IFindUserByEmailDTO from '@modules/users/dtos/IFindUserByEmailDTO';
import IFindAllUsersByTypeDTO from '@modules/users/dtos/IFindAllUsersByTypeDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = OrmConnection.getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const updatedUser = await this.ormRepository.save(user);

    return updatedUser;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async findById(query: IFindUserByIdDTO): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { id: query.id } });

    return user;
  }

  public async findByEmail(query: IFindUserByEmailDTO): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { email: query.email },
    });

    return user;
  }

  public async findAllByType(query: IFindAllUsersByTypeDTO): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: query.type,
    });

    return users;
  }
}

export default UsersRepository;
