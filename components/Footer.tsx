import Container from "@/components/ui/container";
import {
  AtSignIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="h-16 flex items-center justify-between px-6">
          <p className="text-left text-xs dark:text-white text-muted-foreground">
            &copy;2024 Cipiux. All rights reserved.
          </p>

          <div className="flex items-center gap-x-3">
            <Link
              className="cursor-pointer"
              href={`${process.env.NEXT_PUBLIC_PORTFOLIO_LINK}`}
            >
              <AtSignIcon size={24} />
            </Link>
            <Link
              className="cursor-pointer"
              href={`${process.env.NEXT_PUBLIC_PORTFOLIO_LINK}`}
            >
              <FacebookIcon size={24} />
            </Link>
            <Link
              className="cursor-pointer"
              href={`${process.env.NEXT_PUBLIC_PORTFOLIO_LINK}`}
            >
              <InstagramIcon size={24} />
            </Link>
            <Link
              className="cursor-pointer"
              href={`${process.env.NEXT_PUBLIC_PORTFOLIO_LINK}`}
            >
              <YoutubeIcon size={24} />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
