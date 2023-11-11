import Container from "@/components/ui/container";
import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/ui/post";
import { PostProps } from "@/types";

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

export default function Home() {
  return (
    <>
      <Container>
        <div className="space-y-4 mb-11">
          <CategoriesList />

          <div className="space-y-4">
            <Post {...data[data.length - 1]} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data &&
                data.map((post: PostProps, index) => (
                  <div key={post.id}>
                    <Post {...post} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
