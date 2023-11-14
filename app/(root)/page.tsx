import Container from "@/components/ui/container";
import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/ui/post";
import { PostProps } from "@/types";
import { getBlogPosts } from "@/actions/getBlogPosts";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <>
      <Container>
        <div className="space-y-4 mb-11">
          <CategoriesList />

          <div className="space-y-4">
            <Post {...posts[posts.length - 1]} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {posts &&
                posts.map((post: PostProps) => (
                  <Post key={post.id} {...post} />
                ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
