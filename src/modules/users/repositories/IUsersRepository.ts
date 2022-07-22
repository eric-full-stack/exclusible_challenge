import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserByIdDTO from '../dtos/IFindUserByIdDTO';
import IFindUserByEmailDTO from '../dtos/IFindUserByEmailDTO';
import IFindAllUsersByTypeDTO from '../dtos/IFindAllUsersByTypeDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;

  findById(query: IFindUserByIdDTO): Promise<User | null>;

  findByEmail(query: IFindUserByEmailDTO): Promise<User | null>;

  findAllByType(query: IFindAllUsersByTypeDTO): Promise<User[]>;

  save(user: User): Promise<User>;

  remove(user: User): Promise<void>;
}
