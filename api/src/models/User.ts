// src/models/User.ts
import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

userSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

// Typé correctement pour inclure la méthode validatePassword
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
