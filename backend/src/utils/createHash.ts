import crypto from "node:crypto";

function createSaltAndHash(payload:string|Object, salt:string) {
  const hash = crypto
    .createHash("sha256")
    .update(salt + payload)
    .digest("hex");

  // SIN HASHEAR = f1a1643f-56c7-12323-b45b-b7b674d49eb4hola123
  // HASHEADO = 464d68bbbbaf2dec8869a3939b710f4829539e76a90e6cc884cad075fc73bf77

  // f1a1643f-56c7-12323-b45b-b7b674d49eb4:464d68bbbbaf2dec8869a3939b710f4829539e76a90e6cc884cad075fc73bf77
  return `${salt}:${hash}`; // ==> DATO A GUARDAR EN LA BBDD COMO CONTRASEÑA
}

function UUID() {
  return crypto.randomUUID();
}

export { createSaltAndHash, UUID };
