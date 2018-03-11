import jwt from 'jsonwebtoken';
import User from '../models/User';

export default (
  {
    headers: { authorization: header },
    userEmail,
    currentUser
  }: { header: string, userEmail: string, currentUser: string },
  { status }: { status: {} },
  next: {}
) => {
  let token;
  if (header) token = header.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err: {}, decoded: {}) => {
      if (err) {
        status(401).json({ errors: { global: 'Invalid token' } });
      } else {
        User.findOne({ email: decoded.email }).then((user: {}) => {
          currentUser = user;
          next();
        });
      }
    });
  } else {
    status(401).json({ errors: { global: 'No token' } });
  }
};
