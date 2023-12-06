import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class PasswordGenerator {
  static async hashPassword(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, inputPassword: string) {
    const [storedHashedPassword, salt] = storedPassword.split(".");
    const buffer = (await scryptAsync(inputPassword, salt, 64)) as Buffer;
    return buffer.toString("hex") === storedHashedPassword;
  }
}
