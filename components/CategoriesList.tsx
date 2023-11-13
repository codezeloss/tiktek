import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryProps } from "@/types";
import { getCategories } from "@/actions/getCategories";

export const categoriesData = [
  {
    id: 1,
    name: "Technology",
  },
  {
    id: 2,
    name: "Tips & Tricks",
  },
  {
    id: 3,
    name: "AI",
  },
  {
    id: 4,
    name: "Programming",
  },
];

export const revalidate = 0;

export default async function CategoriesList() {
  const categories = await getCategories();

  return (
    <div className="flex items-center gap-3">
      {categories &&
        categories.map((category: CategoryProps) => (
          <Link
            className=""
            key={category.id}
            href={`/categories/${category.name}`}
          >
            <Button size="sm" variant="outline">
              {category.name}
            </Button>
          </Link>
        ))}
    </div>
  );
}
