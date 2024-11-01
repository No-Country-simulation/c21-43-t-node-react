import Auth from "../models/auth";
import { createSaltAndHash, UUID } from "../utils/createHash";
import { createToken } from "../utils/token";
import UsersService from "./users";
import { Error } from "../types/type";
import { validateSignup, validateLogin } from "../schemas/auth";

class AuthService {
  static async register(data: any) {
    try {
      // Valido los datos ingresados
      const result = validateSignup(data);

      if (!result.success) {
        //console.log(result.error, result.error.errors);

        const errorMessages = result.error.errors
          .map((err) => err.message)
          .join(". ");
        const error: any = new Error(
          `Los datos ingresados son inválidos: ${errorMessages}`
        );
        error["statusCode"] = 400;

        throw error;
      }

      const { email, name, lastName, phoneNumber, password, registrationType } =
        result.data;

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

      // 6. Guardar el password hasheado y el id del usuario.
      const authRecord = await Auth.create({
        userId: newUser.id, // el id del usuario recién creado
        password: hashedPassword, // la contraseña hasheada
      });

      return {
        message: "Usuario registrado exitosamente",
        user: newUser,
        authRecord: authRecord,
        token: token,
      };
    } catch (error: any) {
      throw new Error(error.message || "Error al registrar el usuario");
    }
  }

  static async login(data: any) {
    try {
      // Valido los datos ingresados
      const result = validateLogin(data);

      if (!result.success) {
        const errorMessages = result.error.errors
          .map((err) => err.message)
          .join(". ");
        const error: any = new Error(
          `Los datos ingresados son inválidos: ${errorMessages}`
        );
        error["statusCode"] = 400;

        throw error;
      }

      const { email, password } = result.data;

      // Buscar usuario por su email
      const user: any = await UsersService.getByEmail(email);

      if (!user) {
        {
          const error: any = new Error("Usuario no encontrado");
          error["statusCode"] = 404;
          throw error;
        }
      }

      // Buscar las credenciales del usuario en la tabla 'Auth'
      const userAuth: any = await Auth.findOne({ where: { userId: user.id } });

      if (!userAuth) {
        const error: any = new Error(
          "No se encontraron credenciales asociadas al usuario"
        );
        error["statusCode"] = 404;
        throw error;
      }

      // Descomponer la contraseña almacenada (salt:hash)
      const [salt, storedHash] = userAuth.password.split(":");

      // Hashear la contraseña ingresada con el mismo salt
      const hashedPassword = createSaltAndHash(password, salt);

      // Comparar el hash almacenado con el hash generado
      if (hashedPassword === userAuth.password) {
        // Si coinciden, generar un nuevo token
        const token = createToken({ id: user.id, role: user.registrationType });

        return { message: "Login exitoso", token, user: user };
      } else {
        const error: any = new Error("Contraseña incorrecta");
        error["statusCode"] = 401;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  // static async logout() {
  //   try {
  //     return { message: "Logout exitoso" };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

export default AuthService;
