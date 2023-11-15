import Container from "@/components/ui/container";
import Post from "@/components/ui/post";
import { PostProps } from "@/types";

const getPostsByCategoryName = async (
  catName: string
): Promise<PostProps[] | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      { cache: "no-store" }
    );

    if (response.ok) {
      const categories = await response.json();
      const posts = categories.posts;
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function CategoryPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const posts = await getPostsByCategoryName(params.categoryName);

  return (
    <main className="w-full h-full">
      <Container>
        <div className="space-y-6 w-full h-full">
          <h1 className="font-semibold text-xl sm:text-2xl">
            {decodeURIComponent(params.categoryName)}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-11">
            {posts &&
              posts.map((post: PostProps) => <Post key={post.id} {...post} />)}
          </div>

          <div className="w-full h-full py-11">
            {!posts && (
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
