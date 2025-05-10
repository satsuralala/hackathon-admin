import { model, models, Schema } from "mongoose";

const usersSchema = new Schema({
  email: String,
  password: String,
  createdAt: { type: Date, default: new Date() },
});

export const UsersModel = models.User || model("User", usersSchema);
