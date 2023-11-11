import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthButton from "@/components/ui/auth-button";

interface Props {
  open: boolean;
  onOpen: () => void;
}

export function LoginDialog({ open, onOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="max-w-[380px] sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Already have an account?</DialogTitle>
          <DialogDescription>Sign in to your account</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 my-3">
          <AuthButton img={"/github-logo.svg"} title="Sign in with Github" />
          <AuthButton img={"/google-logo.svg"} title="Sign in with Google" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
