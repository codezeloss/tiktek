import { PostProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import PostActions from "@/components/PostActions";
import { ExternalLinkIcon, Share2Icon } from "lucide-react";

export default async function Post({
  id,
  title,
  content,
  authorEmail,
  author,
  createdAt,
  categoryName,
  imageUrl,
}: PostProps) {
  const session = await getServerSession(authOptions);
  const isEditable = session && session?.user?.email === authorEmail;

  return (
    <>
      <div className={`w-full h-fit border rounded-md overflow-hidden`}>
        <div className="w-full h-[220px] md:h-[250px] lg:h-[300px]">
          <div className="relative w-full h-full">
            {imageUrl ? (
              <Image
                className="object-cover"
                src={imageUrl}
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
            <div className="opacity-0 hover:opacity-100 cursor-pointer flex hover:bg-black/50 absolute top-0 right-0 w-full h-full z-40 p-6 items-center justify-center">
              <Link href={`/post/${id}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 text-black bg-white"
                >
                  <ExternalLinkIcon size={16} />
                  Read post
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-8 pt-2 pb-6 md:pb-8">
          <p className="text-xs font-normal mt-2 text-muted-foreground">
            <span className="font-medium">
              {author ? `${author.name} |` : ""}
            </span>{" "}
            {formatDate(createdAt)}
          </p>

          <Link href={`/post/${id}`}>
            <h2 className="text-xl sm:text-2xl font-semibold my-2 hover:underline cursor-pointer">
              {title?.substring(0, 20)}...
            </h2>
          </Link>

          <p className="text-xs sm:text-sm mb-4 font-normal text-gray-800 dark:text-gray-400 text-ellipsis text-justify h-20 md:h-24 lg:h-28 xl:h-20">
            {content?.substring(0, 170)}...
          </p>

          <div className="flex items-center justify-between gap-4">
            <Link href={`/categories/${categoryName}`}>
              <Button className="shadow-md" size="sm" variant="outline">
                {categoryName}
              </Button>
            </Link>
            {isEditable && <PostActions id={id} />}
          </div>
        </div>
      </div>
    </>
  );
}
