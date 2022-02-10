import { OAuth2Client } from 'google-auth-library';
import { NextFunction, Request, Response } from 'express';

const validateToken = async (input: string | string[] | undefined) => {
  if (!input || Array.isArray(input)) {
    throw new Error('"authorization_token" is missing or incorrect');
  }

  const { getTokenInfo } = new OAuth2Client();

  await getTokenInfo(input);
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      const token = req.headers['authorization_token'];
      await validateToken(token);
    }

    next();
  } catch (error) {
    next(error);
  }
};
