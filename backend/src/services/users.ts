import { log } from "console";
import User from "../models/users";

class UsersService {
  static async getAll() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async create(data: any) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async update(id: string, data: any) {
    try {
      const [user] = await User.update(data, { where: { id } });
      console.log(user);

      return user;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id: string) {
    try {
      const user = await User.destroy({ where: { id } });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersService;
