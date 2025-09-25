"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="border border-t-0 bg-card/30 mt-0 relative overflow-hidden max-w-5xl mx-auto">
      {/* Bottom section */}
      <div className="container p-3 mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-1">
          © 2025 Built with
          <HeartIcon className="size-4 fill-current !text-green-500 animate-pulse hover:scale-120 duration-100" />
          <span>
            By{" "}
            <Link
              href={"#"}
              className={cn(
                buttonVariants({ variant: "link" }),
                "px-2 max-h-none underline hover:!no-underline bg-transparent hover:bg-accent h-6 rounded-[15px]"
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
            asChild
          >
            <Link href={"https://nextjs.org/"}>Built with Next.js</Link>
          </Badge>
          <Badge
            variant="outline"
            className="text-xs hover:bg-accent cursor-pointer"
            asChild
          >
            <Link href={"https://vercel.com/"}>Deployed on Vercel</Link>
          </Badge>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
