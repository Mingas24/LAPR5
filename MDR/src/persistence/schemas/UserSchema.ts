import { IUserPersistence } from "../../dataschema/IUserPersistence";
import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  sex: { type: String, required: true },
  birth: { type: Number, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  role: { type: String, required: true },
});

export default mongoose.model<IUserPersistence & mongoose.Document>(
  "User",
  User
);
