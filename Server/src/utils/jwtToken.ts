import { Response } from 'express';
import { IUser } from '../models/userSchema';

const sendToken = (user: IUser, statusCode: number, res: Response): void => {
  const token = user.getJWTToken();

  // Define cookie options
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Extract user data excluding the token
  const userDoc = user.toObject();
  userDoc.token = token;

  // Send response
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user: userDoc,
  });
};

export default sendToken;
