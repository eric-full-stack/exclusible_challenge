import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: instanceToInstance(user), token });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const currentUserId = request.user.id;

    const listUser = container.resolve(ListUserService);

    const user = await listUser.execute(currentUserId);

    return response.json(instanceToInstance(user));
  }
}
