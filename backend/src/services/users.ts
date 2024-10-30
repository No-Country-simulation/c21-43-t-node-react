import { any } from "zod";
import User from "../models/users";
import { validateUser } from "../schemas/users";

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
      const { registrationType } = data;

      const validTypes = ["Client", "Seller", "Admin"];
      if (!validTypes.includes(registrationType)) {
        const error: any = new Error(
          "El tipo de usuario debe ser 'Client', 'Seller' o 'Admin'."
        );
        error["statusCode"] = 400;
        throw error;
      }

      const newUser = await User.create(data);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async getByEmail(email: string) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      // if (!user) {
      //   const error: any = new Error("Usuario no encontrado");
      //   error["statusCode"] = 404;
      //   throw error;
      // }

      return user;
    } catch (error) {
      throw error;
    }
  }
  static async update(id: string, data: any) {
    try {
      const result: any = validateUser(data);
      await User.update(result.data, { where: { id } });
      const user = await User.findOne({
        where: {
          id: id,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id: string) {
    try {
      const users = await User.destroy({ where: { id } });
      if (!users) {
        throw new Error("No existe el usuario en nuestros registros");
      }

      return `Usuario eliminado correctamente`;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersService;
