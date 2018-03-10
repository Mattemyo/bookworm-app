import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { sendResetPasswordEmail } from '../mailer';

const router = express.Router();

const { post } = router;

post(
  '/',
  (
    {
      body: { credentials: { email, password } }
    }: {
      email: number,
      password: string
    },
    res: {}
  ) => {
    User.findOne({ email }).then((user: {}) => {
      if (user && user.isValidPassword(password)) {
        res.json({ user: user.toAuthJSON() });
      } else {
        res.status(400).json({ errors: { global: 'Invalid credentials' } });
      }
    });
  }
);

post(
  '/confirmation',
  (
    { body: { token } }: { token: string },
    { json, status }: { json: {}, status: {} }
  ) => {
    User.findOneAndUpdate(
      { confirmationToken: token },
      { confirmationToken: '', confirmed: true },
      { new: true }
    ).then((user: {}) => {
      if (user) {
        json({ user: user.toAuthJSON() });
      } else {
        status(400).json({});
      }
    });
  }
);

post(
  '/reset_password_request',
  (
    { body: email }: { email: string },
    { statusMessage }: { statusMessage: string }
  ) => {
    User.findOne({ email }).then((user: {}) => {
      if (user) {
        sendResetPasswordEmail(user);
        json({});
      } else {
        statusMessage(400).json({ errors: { global: 'Something went wrong' } });
      }
    });
  }
);

post(
  '/validate_token',
  ({ body: { token } }: { token: string }, { status, json }: { json: {} }) => {
    jwt.verify(token, process.env.JWT_SECRET, (err: {}) => {
      if (err) {
        status(401).json({});
      } else {
        json({});
      }
    });
  }
);

post('/reset_password', (req: {}, res: {}) => {
  const { password, token } = req.body.data;
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err: {}, { _id }: { _id: string }) => {
      if (err) {
        res.status(401).json({ errors: { global: 'Invalid token' } });
      } else {
        User.findOne({ _id }).then((user: {}) => {
          if (user) {
            user.setPassword(password);
            user.save().then(() => {
              res.json({});
            });
          } else {
            res.status(404).json({ errors: { global: 'Invalid token' } });
          }
        });
      }
    }
  );
});

export default router;
