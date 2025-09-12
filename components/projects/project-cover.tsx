"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type ProjectCoverProps = {
  src?: string[];
  alt: string;
};

const ProjectCover = ({ src, alt }: ProjectCoverProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [loadedImages, setLoadedImages] = React.useState<Set<number>>(
    new Set()
  );
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  // Load all images when component mounts
  React.useEffect(() => {
    if (src && src.length > 0 && isInitialLoad) {
      const loadPromises = src.map((_, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, index]));
            resolve();
          };
          img.onerror = () => resolve(); // Still resolve on error to not block
          img.src = src[index];
        });
      });

      Promise.all(loadPromises).then(() => {
        setIsInitialLoad(false);
      });
    }
  }, [src, isInitialLoad]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={cn("w-full h-fit relative rounded-xl overflow-hidden group")}
    >
      {src && src?.length >= 1 && (
        <>
          {isInitialLoad ? (
            <div className="w-full h-64 bg-muted/20 rounded-3xl flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">
                  Loading images...
                </p>
              </div>
            </div>
          ) : (
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                  jump: false,
                  playOnInit: true,
                  stopOnMouseEnter: true,
                }),
              ]}
              setApi={setApi}
              className="w-full rounded-3xl overflow-clip"
            >
              <CarouselContent className="w-full h-auto">
                {src.map((image, index) => (
                  <CarouselItem key={index} className="w-full h-auto">
                    {loadedImages.has(index) ? (
                      <Image
                        src={image}
                        alt={alt}
                        width={1200}
                        height={800}
                        className="!w-full h-auto object-cover shadow-none !rounded-3xl"
                        priority={index === 0} // Prioritize first image
                      />
                    ) : (
                      <div className="w-full h-64 bg-muted/20 rounded-3xl flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-12 rounded-l-none !bg-background cursor-pointer border-l-0 h-9" />
              <CarouselNext className="mr-12 rounded-r-none !bg-background cursor-pointer border-r-0 h-9" />
            </Carousel>
          )}
        </>
      )}
      <div
        className={cn(
          "pt-1 text-center text-sm text-muted-foreground",
          (!src?.length || isInitialLoad) && "hidden"
        )}
      >
        Image {current} of {count}
      </div>
    </div>
  );
};

export default ProjectCover;
