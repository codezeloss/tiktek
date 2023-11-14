import Container from "@/components/ui/container";
import {
  AtSignIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="h-16 flex items-center justify-between px-6">
          <p className="text-center text-xs dark:text-white text-muted-foreground">
            &copy; 2024 Cipiux, Inc. All rights reserved
          </p>

          <div></div>

          <div className="flex items-center gap-x-3">
            <AtSignIcon size={24} />
            <FacebookIcon size={24} />
            <InstagramIcon size={24} />
            <YoutubeIcon size={24} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
