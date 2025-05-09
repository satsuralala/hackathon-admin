import mongoose from "mongoose";

export const ApiWrapper = (handler: (req: Request) => any) => {
  return async (req: Request) => {
    await connectDB();
    const response = await handler(req);
    return response;
  };
};

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("successfully");
  } catch (err) {
    console.log((err as Error).message);
  }
};
