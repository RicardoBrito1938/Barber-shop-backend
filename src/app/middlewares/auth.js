import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // aqui estou dando o split pelo espaço, o meu auth esta divido com a palavra "Bearer" e em seguida o token, fazendo a desustruturação dessa maneira const [, token], eu estou atutomaticamente jogando a primera parte dentro de um array, e ja descartando ela

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Token invalid' });
  }
};
