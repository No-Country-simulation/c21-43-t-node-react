import * as jwt from "jsonwebtoken";

function createToken(data: string | Object) {
  const token = jwt.sign(data, process.env.SECRET_KEY as jwt.Secret, {
    expiresIn: "1d", // VENCE EN 1 DÍA
  });

  return token;
}

export { createToken };
