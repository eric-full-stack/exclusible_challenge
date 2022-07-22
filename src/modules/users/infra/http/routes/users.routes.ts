import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import hasRole from 'shared/infra/http/middlewares/hasRole';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', ensureAuthenticated, usersController.index);

usersRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      'email-confirmation': Joi.string().valid(Joi.ref('email')).required(),
      password: Joi.string().min(6).max(6).required(),
      'password-confirmation': Joi.string()
        .valid(Joi.ref('password'))
        .required(),
      type: Joi.string()
        .valid('admin', 'default')
        .default('default')
        .required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string().min(6).max(6),
      type: Joi.string().valid('admin', 'default'),
    },
  }),
  usersController.update,
);

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  hasRole(['admin']),
  usersController.delete,
);

export default usersRouter;
