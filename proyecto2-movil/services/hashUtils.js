/* import bcrypt from "react-native-bcrypt"; */

var bcrypt = require("bcryptjs");

export async function newHashPassword(password) {
  /* const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt); */
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return { salt, hash };
}

export async function comparePassword(password, hash) {
  /* return await bcrypt.compare(password, hash); */
  return bcrypt.compareSync(password, hash);
}
