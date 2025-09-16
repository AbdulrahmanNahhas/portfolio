import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";

type ProjectBannerProps = {
  slug: string;
  title: string;
  icon?: string;
  iconSize?: string;
  category: string;
  description: string;
  className?: string;
};

const ProjectBanner = ({
  slug,
  title,
  icon,
  iconSize,
  category,
  className,
  description,
}: ProjectBannerProps) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-none p-1 overflow-hidden bg-gradient-to-br from-background/10 to-accent/5 border-y",
        className
      )}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-40" />

      <div className="relative flex flex-col justify-start p-6 md:p-10 text-foreground gap-3">
        <div className="animate-pulse-light w-16 h-1 bg-foreground/70" />
        <p className="uppercase tracking-wider text-xs md:text-sm font-medium text-foreground/80">
          {category}
        </p>
        <div className="flex items-center gap-3">
          {icon ? (
            <Image
              className={cn(
                "rounded-sm size-14 p-1 bg-background border aspect-square",
                iconSize === "fit" ? "p-0 bg-red-500" : "p-1 bg-white"
              )}
              src={
                icon ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundType=gradientLinear`
              }
              width={72}
              height={72}
              alt={slug}
            />
          ) : (
            <Avatar className="size-14 rounded-md border flex items-center justify-center p-0 bg-transparent">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${slug}`}
                alt={slug}
                className="w-auto h-full object-contain"
              />
            </Avatar>
          )}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {title}
          </h1>
        </div>
        {/* Project Description */}
        <p className="text-xl text-muted-foreground">{description}</p>

        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mb-16" />
        <div className="absolute top-0 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl -mt-10" />
      </div>
    </div>
  );
};

export default ProjectBanner;
