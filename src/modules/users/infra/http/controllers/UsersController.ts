import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUserService from '@modules/users/services/ListUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUsersService);

    const user = await listUser.execute();

    return response.json(instanceToInstance(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, type } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      type,
    });

    return response.json(instanceToInstance(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listUser = container.resolve(ListUserService);

    const user = await listUser.execute(id);

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, type } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      type,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.json(204).send();
  }
}
