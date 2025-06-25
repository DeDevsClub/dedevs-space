"use client";

import * as React from "react";
import {
  Carousel as UICarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"; // Path to Shadcn UI carousel primitives
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LearnItem } from "@/lib/types"; // Import the LearnItem type
import { Icons, type IconName } from "@/components/icons"; // Import Icons helper
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CustomCarouselProps {
  items: LearnItem[];
  opts?: React.ComponentProps<typeof UICarousel>["opts"];
  showDots?: boolean;
  showArrows?: boolean;
  itemsToShow?: number; // Number of items to show per slide (for basis calculation)
}

const Carousel: React.FC<CustomCarouselProps> = ({
  items,
  opts,
  showDots = true,
  showArrows = true,
  itemsToShow = 1, // Default to 1 item per slide, adjust for more
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect); // Handle re-initialization if items change

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const LucideIcon = ({
    name,
    ...props
  }: { name: string } & React.ComponentProps<typeof Icons.HelpCircle>) => {
    const IconComponent = Icons[name as IconName];
    if (!IconComponent) {
      return <Icons.HelpCircle {...props} />;
    }
    return <IconComponent {...props} />;
  };

  const basisClass =
    itemsToShow === 1
      ? "basis-full"
      : itemsToShow === 2
        ? "md:basis-1/2"
        : itemsToShow === 3
          ? "lg:basis-1/3 md:basis-1/2"
          : "lg:basis-1/4 md:basis-1/2"; // Default for 4 or more

  return (
    <div className="w-full max-w-7xl h-fit mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UICarousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          ...opts,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.value} className={`pl-4 ${basisClass}`}>
              <div className="p-1 h-full">
                <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group bg-card">
                  <CardHeader className="items-center text-center p-6 bg-muted/20 border-b">
                    <LucideIcon
                      name={item.icon}
                      className="w-10 h-10 mb-3 text-primary group-hover:scale-110 transition-transform"
                    />
                    <CardTitle className="text-base sm:text-md md:text-lg lg:text-xl font-semibold text-card-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-6 text-center flex flex-col justify-between">
                    <p className="text-sm sm:text-base lg:text-md text-muted-foreground mb-4">
                      {item.content}
                    </p>
                    {item.cta && item.ctaLabel && (
                      <Button
                        asChild
                        variant="link"
                        size="sm"
                        className="mt-auto w-fit mx-auto text-primary hover:text-primary/90 font-medium"
                      >
                        <Link href={item.cta}>
                          {item.ctaLabel}{" "}
                          <Icons.ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showArrows && (
          <>
            <CarouselPrevious className="absolute left-[-15px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-10 text-primary hover:text-primary/80 disabled:opacity-30 transition-all bg-background/70 hover:bg-background rounded-full shadow-lg w-10 h-10 sm:w-12 sm:h-12" />
            <CarouselNext className="absolute right-[-15px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-10 text-primary hover:text-primary/80 disabled:opacity-30 transition-all bg-background/70 hover:bg-background rounded-full shadow-lg w-10 h-10 sm:w-12 sm:h-12" />
          </>
        )}
      </UICarousel>
      {showDots && count > 0 && (
        <div className="flex justify-center space-x-2 py-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                index + 1 === current
                  ? "bg-primary scale-125 w-4"
                  : "bg-muted hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
