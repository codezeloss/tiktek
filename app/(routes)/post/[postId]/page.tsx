import Image from "next/image";
import Container from "@/components/ui/container";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostProps } from "@/types";

const getSinglePost = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/posts/${id}`,
      { cache: "no-store" }
    );

    if (response.ok) {
      const post = await response.json();
      return post;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post: PostProps = await getSinglePost(params.postId);

  return (
    <main className="mb-11 pt-8 space-y-4">
      <div className="relative w-full h-[300px] max-h-[300px] border px-0 mx-0">
        <div className="absolute w-full h-[300px] overflow-hidden">
          {post?.imageUrl ? (
            <Image
              className="object-cover"
              src={post.imageUrl}
              alt="Post thumbnail"
              fill
            />
          ) : (
            <Image
              className="object-cover"
              src="/thumbnail-placeholder.png"
              alt="Post thumbnail"
              fill
            />
          )}
        </div>
      </div>

      <Container>
        <div className="space-y-4">
          <Link href={`/categories/${post.categoryName}`}>
            <Button className="" size="sm" variant="secondary">
              {post.categoryName}
            </Button>
          </Link>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white">
            {post.title}
          </h1>

          <p className="w-full tracking-wide leading-8 text-sm md:text-base md:leading-8 text-justify">
            {post.content}
          </p>

          <div className="hidden sm:flex items-center gap-x-3 gap-y-1 flex-wrap">
            {post.links &&
              post.links.map((link: string, index: number) => (
                <Link
                  key={index}
                  className="w-fit text-gray-700 dark:text-gray-400 text-xs flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 py-2 px-2.5 rounded-md"
                  href={link}
                >
                  <LinkIcon size={12} />
                  {link}
                </Link>
              ))}
          </div>

          <div className="pt-4">
            <div className="text-muted-foreground text-xs font-normal space-y-2">
              <p>
                Posted by:{" "}
                <span className="font-medium">
                  {post.author ? post.author.name : "Anonymous"}
                </span>
              </p>
              <p>
                Published on:{" "}
                <span className="font-medium">
                  {formatDate(post.createdAt)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
