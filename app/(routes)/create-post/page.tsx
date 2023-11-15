import Container from "@/components/ui/container";
import PostForm from "@/components/PostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <main className="">
        <Container>
          <div className="mb-11">
            <div className="mb-8">
              <h1 className="font-semibold text-2xl">Create New Post</h1>
            </div>

            <PostForm />
          </div>
        </Container>
      </main>
    </>
  );
}
