import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryProps } from "@/types";

const getCategories = async (): Promise<CategoryProps[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);

    if (response.ok) {
      const categories = await response.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function CategoriesList() {
  const categories = await getCategories();

  return (
    <div className="flex items-center flex-wrap gap-3">
      {categories &&
        categories.map((category: CategoryProps) => (
          <Link key={category.id} href={`/categories/${category.name}`}>
            <Button size="sm" variant="outline">
              {category.name}
            </Button>
          </Link>
        ))}
    </div>
  );
}
