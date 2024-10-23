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
          email: email, // Busca por el campo "email"
        },
      });

      if (!user) {
        console.log("Usuario no encontrado");
        //throw new Error("Usuario no encontrado");
      }

      console.log("Usuario encontrado:", user);
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
