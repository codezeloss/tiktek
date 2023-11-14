import Container from "@/components/ui/container";
import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/ui/post";
import { PostProps } from "@/types";
import { getBlogPosts } from "@/actions/getBlogPosts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <>
      <Container>
        <div className="space-y-4 mb-11">
          <CategoriesList />

          <div className="space-y-4">
            {posts.length > 0 && <Post {...posts[posts.length - 1]} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {posts.length > 0 &&
                posts.map((post: PostProps) => (
                  <Post key={post.id} {...post} />
                ))}

              {!posts && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-6">
                  <p className="w-full text-muted-foreground text-center text-sm mx-auto">
                    No posts found
                  </p>
                  <Link href="/create-post">
                    <Button size="lg" variant="default">
                      Create post
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {posts.length >= 3 && <Post {...posts[2]} />}
            {posts.length >= 5 && <Post {...posts[4]} />}
          </div>
        </div>
      </Container>
    </>
  );
}
