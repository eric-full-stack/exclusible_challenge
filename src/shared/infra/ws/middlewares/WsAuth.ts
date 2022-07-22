import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { VerifyClientCallbackAsync } from 'ws';

const fc: VerifyClientCallbackAsync = function WsAuth(info, callback) {
  const authHeader = info.req.headers.authorization;

  if (!authHeader) {
    return callback(false);
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.jwt.secret);

    return callback(true);
  } catch {
    return callback(false);
  }
};

export default fc;
