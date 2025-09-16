"use client";

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

  if (!src || src.length === 0) {
    return (
      <div className="w-full h-64 bg-muted/20 rounded-xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-fit mx-auto relative group my-8 select-none">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
            jump: false,
            playOnInit: true,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
            stopOnLastSnap: false,
          }),
        ]}
        setApi={setApi}
        className="w-fit select-none"
        opts={{
          loop: true,
          align: "center",
          skipSnaps: false,
          dragFree: true,
        }}
      >
        <CarouselContent className="w-fit select-none">
          {src.map((image, index) => (
            <CarouselItem
              key={index}
              className="cursor-target !basis-auto w-fit select-none"
            >
              <div className="relative w-fit h-full flex items-center justify-center select-none">
                <Image
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="h-96 w-auto rounded-sm select-none pointer-events-none"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  draggable={false}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {src.length > 1 && (
          <>
            <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </>
        )}
      </Carousel>

      {src.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {current} / {count}
        </div>
      )}
    </div>
  );
};

export default ProjectCover;
