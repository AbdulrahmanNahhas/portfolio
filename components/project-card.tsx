import { ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProjectCard = ({
  title,
  icon,
  description,
  image,
  slug,
  iconSize,
}: {
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  iconSize?: string;
  image?: string;
}) => {
  return (
    <Link
      href={`/projects/${slug}`}
      className={
        "p-6 md:not-odd:border-l border-b md:[&:nth-last-child(2)]:border-0 md:last:border-b-0 flex flex-col gap-1 hover:bg-card group"
      }
    >
      {image ? (
        <Image
          src={image}
          alt="image"
          width={1200}
          height={800}
          className="!aspect-video h-auto w-full rounded-xl"
        />
      ) : (
        <div className="bg-accent border-2 w-full text-muted-foreground rounded-xl !aspect-video h-auto flex items-center justify-center">
          <ImageIcon className="size-24 opacity-15" />
        </div>
      )}
      <div className="flex gap-2 justify-between pt-3 items-center w-full">
        <div className="flex gap-2 justify-center items-start w-full">
          {icon ? (
            <Avatar
              className={cn(
                "size-12 rounded-md border p-2 bg-white mt-1",
                iconSize === "fit" && "p-0 bg-transparent"
              )}
            >
              <AvatarImage
                src={
                  icon ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundType=gradientLinear`
                }
                alt={"english"}
                className="w-auto h-full object-contain"
              />
              <AvatarFallback className="rounded-lg">{title}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="size-12 rounded-md border flex items-center justify-center p-0 bg-transparent">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundType=gradientLinear`}
                alt={"english"}
                className="w-auto h-full object-contain"
              />
            </Avatar>
          )}
          <div className="flex flex-col gap-0 justify-center items-start w-full">
            <h1 className="font-semibold">{title}</h1>
            <span className="text-muted-foreground font-light text-sm line-clamp-2">
              {description}
            </span>
          </div>
        </div>

        <Button
          variant={"default"}
          size={"icon"}
          className="rounded-full p-1 aspect-square size-10 cursor-pointer hidden sm:flex"
        >
          <ChevronRight className="size-8 relative left-[1px] text-xl group-hover:animate-pulse" />
        </Button>
      </div>
    </Link>
  );
};

export default ProjectCard;
