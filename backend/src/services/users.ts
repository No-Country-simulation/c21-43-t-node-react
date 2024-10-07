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
}

export default UsersService;
