import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(3, { message: "El nombre debe tener mas de 3 caracteres" })
      .max(15, { message: "El nombre debe tener menos de 15 caracteres" }),
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email("El email ingresado tiene un formato invalido"),
    password: z
      .string({
        required_error: "La contrasena es requerida",
      })
      .min(6, { message: "La contrasena debe tener mas de 6 caracteres" })
      .max(15, {
        message: "La contrasena debe tener un maximo de 15 caracteres",
      }),
    lastName: z
      .string({
        required_error: "El apellido es requerido",
      })
      .min(3, { message: "El apellido debe tener mas de 3 caracteres" })
      .max(15, { message: "El apellido debe tener menos de 15 caracteres" }),
    phoneNumber: z.string({
      required_error: "El numero de telefono es requerido",
    }),
    registrationType: z.enum(["Client", "Seller", "Admin"], {
      message: "El tipo de registro debe ser Client, Seller, Admin",
    }),
  })
  .strict();

export function validateSignup(data: any) {
  return registerSchema.safeParse(data);
}

const loginSchema = z
  .object({
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email("El email ingresado tiene un formato invalido"),
    password: z
      .string({
        required_error: "La contrasena es requerida",
      })
      .min(6, { message: "La contrasena debe tener mas de 6 caracteres" })
      .max(15, {
        message: "La contrasena debe tener un maximo de 15 caracteres",
      }),
  })
  .strict();

export function validateLogin(data: any) {
  return loginSchema.safeParse(data);
}
