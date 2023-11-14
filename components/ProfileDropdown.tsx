import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Spinner from "@/components/ui/spinner";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";

interface Props {
  img_src: any;
  username: string | undefined | null;
  status: string;
}

export default function ProfileDropdown({ img_src, username, status }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") return <Spinner />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer hover:shadow-xl" asChild>
        <Image
          className="rounded-full border-2 border-black dark:border-white"
          src={img_src}
          alt="User profile image"
          width={40}
          height={40}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 pb-4">
        <DropdownMenuLabel>
          {username ? username : "My Account"}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem>Home</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link href="/create-post">
            <DropdownMenuItem>Create Post</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="w-full px-2 mt-2">
          <Button
            disabled={isLoading}
            className="w-full flex gap-x-2 items-center font-medium"
            variant="destructive"
            size="default"
            onClick={async () => {
              setIsLoading(true);
              await signOut();
              setIsLoading(false);
            }}
          >
            <LogOutIcon size={16} />
            Sign out
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
