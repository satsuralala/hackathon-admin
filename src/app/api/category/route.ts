import { CategoryModel } from "@/models/category.model";

export async function POST(request: Request) {
  try {
    const newCategory = await request.json();
    await CategoryModel.insertOne(newCategory);
    return new Response(null, { status: 201 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
