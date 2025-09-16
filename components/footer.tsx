"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 mt-0 relative overflow-hidden max-w-5xl mx-auto border-x">
      {/* Bottom section */}
      <div className="container p-4 mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>© 2025 Abdulrahman Nahhas</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-xs">
            Built with Next.js
          </Badge>
          <Badge variant="outline" className="text-xs">
            Deployed on Vercel
          </Badge>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
