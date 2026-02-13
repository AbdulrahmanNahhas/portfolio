"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@phosphor-icons/react"
import { buttonVariants } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer style={{ direction: "ltr" }} className="px-5 py-3 border bg-secondary/25 mt-0 relative overflow-hidden container  flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
      <div className="flex items-center gap-1">
        © 2026 Built with
        <HeartIcon className="size-4 fill-current text-green-500 animate-pulse hover:scale-120 duration-100" />
        <span>
          By{" "}
          <Link
            href={"#"}
            className={cn(
              buttonVariants({ variant: "link" }),
              "px-2 max-h-none underline hover:no-underline bg-transparent hover:bg-accent h-6 rounded-[15px]"
            )}
          >
            Me
          </Link>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="text-xs hover:bg-accent cursor-pointer"
          render={

            <Link href={"https://nextjs.org/"}>Built with Next.js</Link>
          }
        />
        <Badge
          variant="outline"
          className="text-xs hover:bg-accent cursor-pointer"
          render={
            <Link href={"https://vercel.com/"}>Deployed on Vercel</Link>
          }
        />
      </div>
    </footer>
  );
};

export default Footer;
