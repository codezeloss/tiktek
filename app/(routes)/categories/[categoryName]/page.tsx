import Container from "@/components/ui/container";
import Post from "@/components/ui/post";
import { PostProps } from "@/types";
import { getPostsByCategoryName } from "@/actions/getPostsByCategoryName";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CategoryPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const posts: PostProps[] = await getPostsByCategoryName(params.categoryName);

  return (
    <main>
      <Container>
        <div className="space-y-6">
          <h1 className="font-semibold text-xl sm:text-2xl">
            {decodeURIComponent(params.categoryName)}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-11">
            {posts.length > 0 &&
              posts.map((post: PostProps) => <Post key={post.id} {...post} />)}
          </div>

          <div className="w-full h-full py-11">
            {posts.length === 0 && (
              <p className="w-full text-muted-foreground text-center text-sm mx-auto">
                No posts
              </p>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
