import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import cryptoRouter from '@modules/crypto/infra/http/routes/crypto.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);
routes.use('/cryptos', cryptoRouter);

export default routes;
