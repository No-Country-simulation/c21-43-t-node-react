import { NextFunction, Request, Response } from "express";
import Auth from "../services/auth";

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = await Auth.register(req.body);

      res.status(200).json({ data: auth });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = await Auth.login(req.body);
      res.status(200).json({ data: auth });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      //await Auth.logout(req.body);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
