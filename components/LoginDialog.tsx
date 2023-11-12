"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthButton from "@/components/ui/auth-button";
import { signIn, useSession } from "next-auth/react";
import Spinner from "@/components/ui/spinner";

interface Props {
  open: boolean;
  onOpen: () => void;
}

export function LoginDialog({ open, onOpen }: Props) {
  const { status } = useSession();

  if (status === "loading") return <Spinner />;

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="max-w-[380px] sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Already have an account?</DialogTitle>
          <DialogDescription>Sign in to your account</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 my-3">
          <AuthButton
            img={"/github-logo.svg"}
            title="Sign in with Github"
            handleClick={() => signIn("github")}
          />
          <AuthButton
            img={"/google-logo.svg"}
            title="Sign in with Google"
            handleClick={() => signIn("google")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
