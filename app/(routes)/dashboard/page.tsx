import { PostProps } from "@/types";
import Post from "@/components/ui/post";
import Container from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

const getAuthorPosts = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/authors/${email}`
    );
    const { posts } = await response.json();
    return posts;
  } catch (error) {
    return null;
  }
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    redirect("/");
  }

  if (email) {
    posts = await getAuthorPosts(email);
  }

  return (
    <main className="">
      <Container>
        <div className="mb-11">
          <div className="mb-8">
            <h1 className="font-semibold text-2xl">Dashboard</h1>
          </div>

          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts &&
              posts.map((post: PostProps) => (
                <div key={post.id}>
                  <Post {...post} />
                </div>
              ))}
          </div>

          <div className="w-full h-full py-11">
            {!posts && (
              <div className="w-full h-full flex flex-col items-center justify-center gap-y-6">
                <p className="w-full text-muted-foreground text-center text-sm mx-auto">
                  No post created
                </p>
                <Link href="/create-post">
                  <Button size="lg" variant="default">
                    Create post
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
