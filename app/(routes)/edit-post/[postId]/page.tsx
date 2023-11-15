import Container from "@/components/ui/container";
import EditPostForm from "@/components/EditPostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

const getSinglePost = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/posts/${id}`,
      { cache: "no-store" }
    );

    if (response.ok) {
      const categories = await response.json();
      const posts = categories.posts;
      return posts;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const session = await getServerSession(authOptions);
  const post = await getSinglePost(params.postId);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="">
      <Container>
        <div className="mb-11">
          <div className="mb-8">
            <h1 className="font-semibold text-2xl">Edit Post</h1>
          </div>

          {post && <EditPostForm post={post} />}

          {!post && (
            <p className="w-full text-muted-foreground text-center text-sm mx-auto">
              Invalid post
            </p>
          )}
        </div>
      </Container>
    </main>
  );
}
