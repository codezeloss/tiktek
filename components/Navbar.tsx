"use client";

import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { LoginDialog } from "@/components/LoginDialog";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ProfileDropdown from "@/components/ProfileDropdown";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { status, data } = useSession();
  const router = useRouter();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  return (
    <header className="border-b px-3 sm:px-6">
      <LoginDialog
        open={openLoginDialog}
        onOpen={() => setOpenLoginDialog(!openLoginDialog)}
      />

      <Container>
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold text-black dark:text-white flex items-center gap-2"
          >
            Cipiux
          </Link>

          {status === "loading" && <Spinner />}

          <div className="flex items-center gap-x-3">
            {status !== "authenticated" ? (
              <Button
                size="default"
                variant="secondary"
                onClick={() => setOpenLoginDialog(true)}
              >
                Sign In
              </Button>
            ) : (
              <div className="flex items-center gap-x-3">
                <Button
                  variant="ghost"
                  className="hidden md:flex text-sm font-semibold text-black dark:text-white items-center gap-1"
                  onClick={() => router.push("/create-post")}
                >
                  <PlusCircle size={18} />
                  Create post
                </Button>

                <ProfileDropdown
                  status={status}
                  img_src={data?.user?.image}
                  username={data?.user?.name}
                />
              </div>
            )}

            {status === "loading" && (
              <p className="text-sm font-semibold text-muted-foreground">
                Loading...
              </p>
            )}

            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
