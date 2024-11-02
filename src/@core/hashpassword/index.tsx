// utils/hashPassword.js
import bcrypt from 'bcryptjs';

export async function hashPassword(password: any) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  return hashedPassword;
}

export async function comparePassword(password: any, hashedPassword: any) {
  return bcrypt.compare(password, hashedPassword);
}
