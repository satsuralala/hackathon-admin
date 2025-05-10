import mongoose from "mongoose";

export const ApiWrapper = (
  handler: (req: Request, context: { params: any }) => Promise<Response>
) => {
  return async (req: Request, context: { params: any }) => {
    await connectDB();
    const response = await handler(req, context);
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
