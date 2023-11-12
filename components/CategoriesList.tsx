import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function CategoriesList() {
  return (
    <div className="flex items-center gap-3">
      {categoriesData &&
        categoriesData.map((category) => (
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
