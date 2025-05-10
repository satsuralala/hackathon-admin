import { model, models, Schema } from "mongoose";

const reportSchema = new Schema({
  userId: String,
  type: String,
  description: String,
  location: {
    lat: Number,
    lng: Number,
  },
  imageUrl: [String],
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
    required: true,
  },
  createdAt: { type: Date, default: new Date() },
});

export const UsersModel = models.report || model("report", reportSchema);
