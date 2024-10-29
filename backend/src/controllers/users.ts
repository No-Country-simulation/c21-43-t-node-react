import { NextFunction, Request, Response } from "express";
import UsersService from "../services/users";

class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UsersService.getAll();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UsersService.create(req.body);
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UsersService.update(req.params.id, req.body);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UsersService.delete(req.params.id);
      res.status(200).json({ message: user });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
