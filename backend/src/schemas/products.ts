import { z } from "zod";

const productSchema = z.object({
  id: z
    .string()
    .uuid({
      message: "El ID debe ser un UUID válido",
    })
    .optional(),
  name: z
    .string({
      required_error: "El nombre del producto es requerido",
    })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z
    .string({
      required_error: "La descripción es requerida",
    })
    .min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
  price: z
    .number({
      required_error: "El precio es requerido",
      invalid_type_error: "El precio debe ser un número",
    })
    .positive({ message: "El precio debe ser un número positivo" }),
  image: z
    .string({
      required_error: "La URL de la imagen es requerida",
    })
    .url({ message: "La URL de la imagen no es válida" }),
  stock: z
    .number({
      required_error: "El stock es requerido",
      invalid_type_error: "El stock debe ser un número",
    })
    .int({ message: "El stock debe ser un número entero" })
    .nonnegative({ message: "El stock no puede ser negativo" }),
  categoryId: z
    .string()
    .uuid({ message: "El ID de categoría debe ser un UUID válido" })
    .optional(),
});

export function validateProduct(data: any) {
  return productSchema.safeParse(data);
}

const updateProductSchema = productSchema.partial();

// Función de validación para la actualización de producto
export function validateUpdateProduct(data: any) {
  return updateProductSchema.safeParse(data);
}
