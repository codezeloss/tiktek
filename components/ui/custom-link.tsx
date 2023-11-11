import { LinkIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  link: string;
  deleteLink: () => void;
}

export default function CustomLink({ link, deleteLink }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Link
        className="w-fit text-gray-700 dark:text-gray-400 text-xs flex items-center gap-2 bg-gray-100 dark:bg-gray-800 py-2 px-2.5 rounded-md"
        href={link}
      >
        <LinkIcon size={12} />
        {link}
      </Link>

      <TrashIcon
        className="text-red-500 cursor-pointer"
        size={14}
        onClick={deleteLink}
      />
    </div>
  );
}
