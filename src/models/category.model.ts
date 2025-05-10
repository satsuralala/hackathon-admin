import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
  title: String,
  description: String,
  infoCount: Number,
  createdAt: { type: Date, default: new Date() },
});

export const CategoryModel =
  models.category || model("category", categorySchema);
