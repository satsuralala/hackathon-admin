import { ApiWrapper } from "@/lib/db";
import { CategoryModel } from "@/models/category.model";
import { NextResponse } from "next/server";

export const PUT = ApiWrapper(
  async (request: Request, { params }: { params: { id: string } }) => {
    try {
      const body = await request.json();
      const category = await CategoryModel.findByIdAndUpdate(
        params.id,
        { $set: body },
        { new: true }
      );

      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      return NextResponse.json(
        { error: "Failed to update category" },
        { status: 500 }
      );
    }
  }
);
export const DELETE = ApiWrapper(
  async (_request: Request, { params }: { params: { id: string } }) => {
    const category = await CategoryModel.findByIdAndDelete(params.id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Category deleted successfully" });
  }
);
