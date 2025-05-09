import { ApiWrapper } from "@/lib/db";

export const GET = ApiWrapper(async (req: Request) => {
  return Response.json("hi");
});
