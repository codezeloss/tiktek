import Container from "@/components/ui/container";
import PostForm from "@/components/PostForm";

export default function CreatePostPage() {
  return (
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
  );
}
