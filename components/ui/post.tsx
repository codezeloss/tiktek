import { PostProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { EditIcon, LinkIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Post({
  id,
  title,
  content,
  author,
  date,
  category,
  links,
  thumbnail,
}: PostProps) {
  const isEditable = true;

  return (
    <div className={`w-full h-fit border rounded-md overflow-hidden`}>
      <div className="relative w-full bg-black h-[300px]">
        {thumbnail ? (
          <Image
            className="object-cover"
            src={thumbnail}
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

        <Link href={""}>
          <Button
            className="absolute top-6 left-6 bg-white text-black shadow-md"
            size="sm"
            variant="ghost"
          >
            {category}
          </Button>
        </Link>
      </div>

      <div className="px-8 pt-2 pb-6">
        <p className="text-xs font-normal mt-2 text-muted-foreground">
          {author} | {date}
        </p>
        <h2 className="text-3xl font-semibold my-2">{title}</h2>
        <p className="text-sm mb-4 font-normal text-gray-800 dark:text-gray-400 text-ellipsis">
          {`${content.substring(0, 210)}...`}
        </p>
        <div className="flex items-center justify-between">
          <div />
          {isEditable && (
            <div className="flex items-center gap-4 ml-auto">
              <Link href={`/edit-post/${id}`}>
                <Button
                  className="flex items-center gap-2"
                  size="sm"
                  variant="secondary"
                >
                  <EditIcon size={18} />
                  Edit post
                </Button>
              </Link>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="destructive"
              >
                <TrashIcon size={18} />
                Delete post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
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
