"use client";

import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CpuIcon } from "lucide-react";
import Link from "next/link";
import { LoginDialog } from "@/components/LoginDialog";
import { useState } from "react";

export default function Navbar() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <header className="border-b px-6">
      <LoginDialog
        open={openDialog}
        onOpen={() => setOpenDialog(!openDialog)}
      />

      <Container>
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-3xl font-bold text-black dark:text-white flex items-center gap-2"
          >
            Cipiux
          </Link>

          <div className="flex items-center gap-x-3">
            <Button
              size="default"
              variant="outline"
              onClick={() => setOpenDialog(true)}
            >
              Sign In
            </Button>

            <Button size="default">Sign Up</Button>

            <div className="ml-1">
              <ModeToggle />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
