import Container from "@/components/ui/container";
import EditPostForm from "@/components/EditPostForm";
import { getSinglePost } from "@/actions/getSinglePost";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

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
