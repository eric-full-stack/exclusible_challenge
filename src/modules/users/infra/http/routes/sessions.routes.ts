import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.get('/me', ensureAuthenticated, sessionsController.show);

export default sessionsRouter;
