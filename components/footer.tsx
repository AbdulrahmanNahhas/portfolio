"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border border-t-0 bg-card/30 mt-0 relative overflow-hidden max-w-5xl mx-auto">
      {/* Bottom section */}
      <div className="container p-3 mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>© 2025 Abdulrahman Nahhas</span>
          <span>•</span>
          <span>All rights reserved</span>
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
