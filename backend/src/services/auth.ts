import Auth from "../models/auth";
import { createSaltAndHash, UUID } from "../utils/createHash";
import { createToken } from "../utils/token";
import UsersService from "./users";

class AuthService {
  // static async register(data: any) {
  //   try {
  //     const { email } = data;

  //     let exist: boolean;
  //     try {
  //       await UsersService.getByEmail(email); //--esto devuelve un usuario..?
  //       exist = true;

  //       //se queda aca si encontro un usuario
  //     } catch (error) {
  //       exist = false;
  //       //entra aca si no encontro ese usuario
  //     }
  //     if (exist) {
  //       throw new Error("El usuario ya esta registrado");
  //     }
  //     const user = await UsersService.create(data);
  //     const userAuth = await this.create(data); //chequear q no exista el email,
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async register(data: any) {
    console.log("entre al registro con", data);

    try {
      const { email, name, lastName, phoneNumber, password, registrationType } =
        data;

      // 1. Verificar si el email ya existe en la tabla de usuarios
      const existingUser = await UsersService.getByEmail(email);
      if (existingUser) {
        throw new Error("El usuario ya está registrado");
      }

      // 2. Crear el usuario en la tabla de `User`
      const newUser: any = await UsersService.create({
        name,
        lastName,
        phoneNumber,
        email,
        registrationType,
      });

      // 3. Generar un salt único para este usuario
      const salt = UUID();

      // 4. Hashear la contraseña usando tu función `createSaltAndHash`
      const hashedPassword = createSaltAndHash(password, salt);

      // 5. Generar el token que contiene la información del rol
      const token = createToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.registrationType,
      });
      console.log("hashed pass", hashedPassword);

      // 6. Guardar el password hasheado, el id del usuario y el token en la tabla de `Auth`
      const authRecord = await Auth.create({
        userId: newUser.id, // el id del usuario recién creado
        password: hashedPassword, // la contraseña hasheada
        token, // el token generado
      });

      return {
        message: "Usuario registrado exitosamente",
        user: newUser,
        auth: authRecord,
      };
    } catch (error: any) {
      throw new Error(error.message || "Error al registrar el usuario");
    }
  }

  static async login(data: any) {
    try {
      const { email, password } = data;

      // Buscar usuario por su email
      const user: any = await UsersService.getByEmail(email);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Buscar las credenciales del usuario en la tabla 'Auth'
      const userAuth: any = await Auth.findOne({ where: { userId: user.id } });
      console.log("el userid es:", user.id);

      if (!userAuth) {
        throw new Error("No se encontraron credenciales asociadas al usuario");
      }

      // Descomponer la contraseña almacenada (salt:hash)
      const [salt, storedHash] = userAuth.password.split(":");

      // Hashear la contraseña ingresada con el mismo salt
      const hashedPassword = createSaltAndHash(password, salt);

      // Comparar el hash almacenado con el hash generado
      if (hashedPassword === userAuth.password) {
        // Si coinciden, generar un nuevo token
        const token = createToken({ id: user.id, role: user.registrationType });

        return { message: "Login exitoso", token };
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } catch (error) {
      throw error;
    }
    // const { password, email } = data;

    // const user: any = await UsersService.getByEmail(email);

    // const [salt, hash] = user.password.split(":");

    // if (createSaltAndHash(password, salt) == user.password) {
    //   const token = createToken({ id: user.id });

    //   // res.status(200).json({ message: "login exitoso", token });
    // } else {
    //   //res.status(401).json({ message: "contraseña incorrecta" });
    // }
  }

  static async logout(token: any) {
    try {
      // Busca un registro en la base de datos donde el token coincida
      const authUser = await Auth.findOne({ where: { token: token } });

      // Si no se encuentra el usuario, lanza un error
      if (!authUser) {
        const error: any = new Error("token no encontrado");
        error.statusCode = 404;
        throw error;
      }
      // Devuelve el usuario encontrado si todo está bien
      return authUser;
      //await Auth.logout(req.body);
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
