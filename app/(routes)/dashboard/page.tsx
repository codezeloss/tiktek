import { PostProps } from "@/types";
import Post from "@/components/ui/post";
import Container from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const data: PostProps[] = [
  {
    id: 1,
    title: "Post title here",
    content:
      "content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content",
    author: "John Doe",
    date: "2023-09-20",
    category: "Mobile",
    links: ["https://example.com/new", "https://example.com/new"],
    thumbnail:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw",
  },
  {
    id: 2,
    title: "Post title here",
    content:
      "content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content",
    author: "John Doe",
    date: "2023-09-20",
    category: "Web dev",
    links: [
      "https://example.com/new",
      "https://example.com/new",
      "https://example.com/new",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw",
  },
  {
    id: 3,
    title: "Post title here",
    content:
      "content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content",
    author: "John Doe",
    date: "2023-09-20",
    category: "Mobile",
    links: ["https://example.com/new", "https://example.com/new"],
    thumbnail:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw",
  },
  {
    id: 4,
    title: "Last Post title here",
    content:
      "content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content",
    author: "John Doe",
    date: "2023-09-20",
    category: "Web dev",
    links: ["https://example.com/new"],
    thumbnail: "",
  },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    //toast.error("You are not signed in!");
    redirect("/");
  }

  return (
    <main className="">
      <Container>
        <div className="mb-11">
          <div className="mb-8">
            <h1 className="font-semibold text-2xl">Dashboard</h1>
          </div>

          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data &&
              data.map((post: PostProps, index) => (
                <div key={post.id}>
                  <Post {...post} />
                </div>
              ))}
          </div>

          <div className="w-full h-full py-11">
            {!data && (
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
