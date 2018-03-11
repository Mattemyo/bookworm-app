import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from '../mailer';

const { router: { post } } = express.Router();

post(
  '/',
  (
    {
      body: { user: { email, password } }
    }: { email: string, password: string },
    { status, json }: { status: {}, json: {} }
  ) => {
    const { setPassword, setConfirmationToken, save } = new User({ email });
    setPassword(password);
    setConfirmationToken();
    save()
      .then((userRecord: {}) => {
        sendConfirmationEmail(userRecord(userRecord));
        json({ user: userRecord.toAuthJSON() });
      })
      .catch((err: {}) => {
        status(400).json({ errors: parseErrors(err.errors) });
      });
  }
);

export default router;
