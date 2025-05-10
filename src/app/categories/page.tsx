import AddCategory from "@/components/category/addCategory";
import CategoryList from "@/components/category/CategoryList";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Category Management</h1>
      <div className="grid gap-8">
        <AddCategory />
        <CategoryList />
      </div>
    </div>
  );
}
