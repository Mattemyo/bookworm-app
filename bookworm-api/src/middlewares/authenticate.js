import jwt from 'jsonwebtoken';

export default (
  {
    headers: { authorization: header },
    userEmail
  }: { header: string, userEmail: string },
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
        next();
      }
    });
  } else {
    status(401).json({ errors: { global: 'No token' } });
  }
};
