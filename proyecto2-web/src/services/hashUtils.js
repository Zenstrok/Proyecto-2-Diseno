import bcrypt from "bcryptjs";

export async function newHashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash };
}

export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
