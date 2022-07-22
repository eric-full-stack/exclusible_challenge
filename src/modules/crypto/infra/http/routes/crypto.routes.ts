import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import hasRole from 'shared/infra/http/middlewares/hasRole';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CryptoController from '../controllers/CryptoController';

const cryptoRouter = Router();
cryptoRouter.use(ensureAuthenticated);

const cryptoController = new CryptoController();

cryptoRouter.get('/', ensureAuthenticated, cryptoController.index);

cryptoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  cryptoController.show,
);

cryptoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      spread: Joi.number().required(),
      pair: Joi.string().required(),
    },
  }),
  cryptoController.create,
);

cryptoRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      pair: Joi.string().required(),
    },
  }),
  cryptoController.updateRateCMC,
);

cryptoRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      spread: Joi.number(),
      pair: Joi.string(),
    },
  }),
  cryptoController.update,
);

cryptoRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  hasRole(['admin']),
  cryptoController.delete,
);

export default cryptoRouter;
