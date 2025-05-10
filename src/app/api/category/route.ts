import { NextResponse } from "next/server";
import { CategoryModel } from "@/models/category.model";
import { ApiWrapper } from "@/lib/db";

export const GET = ApiWrapper(async () => {
  try {
    const categories = await CategoryModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
});

export const POST = ApiWrapper(async (request: Request) => {
  try {
    const body = await request.json();
    const category = await CategoryModel.create({
      ...body,
      infoCount: 0,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
});
