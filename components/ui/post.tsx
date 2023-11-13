import { PostProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostActions from "@/components/PostActions";
import { ExternalLinkIcon } from "lucide-react";

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
        <div className="w-full h-[300px]">
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
            <div className="opacity-0 hover:opacity-100 cursor-pointer flex hover:bg-black/50 absolute top-0 right-0 w-full h-full z-50 p-6 items-center justify-center">
              <Link href={`/post/${id}`}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <ExternalLinkIcon size={16} />
                  Read post
                </Button>
              </Link>
            </div>
            <Link href={`/categories/${categoryName}`}>
              <Button
                className="absolute top-6 left-6 bg-white text-black shadow-md"
                size="sm"
                variant="ghost"
              >
                {categoryName}
              </Button>
            </Link>{" "}
          </div>
        </div>

        <div className="px-8 pt-2 pb-6">
          <p className="text-xs font-normal mt-2 text-muted-foreground">
            <span className="font-medium">
              {author ? `${author.name} |` : ""}
            </span>{" "}
            {formatDate(createdAt)}
          </p>

          <h2 className="text-xl sm:text-3xl lg:text-2xl font-semibold my-2">{`${title.substring(
            0,
            16
          )}...`}</h2>

          <p className="text-xs sm:text-sm mb-4 font-normal text-gray-800 dark:text-gray-400 text-ellipsis">
            {`${content.substring(0, 130)}...`}
          </p>

          <div className="flex items-center justify-between">
            <div />
            {isEditable && <PostActions id={id} />}
          </div>
        </div>
      </div>
    </>
  );
}

{
  /*


          <div className="hidden sm:flex items-center gap-x-3 gap-y-1 flex-wrap">
            {links &&
              links.map((link, index) => (
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


*/
}
