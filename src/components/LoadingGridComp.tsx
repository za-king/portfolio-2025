"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingGridComp() {
  // Create an array of 6 items to match the project grid
  const items = Array.from({ length: 6 }, (_, i) => i);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 ">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
      >
        {items.map((index) => (
          <motion.div key={index} variants={item} className="group relative">
            <Card className="overflow-hidden">
              <div className="space-y-4 p-6">
                {/* Image skeleton */}
                <Skeleton className="aspect-[4/3] w-full" />

                {/* Category skeleton */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-20" />
                </div>

                {/* Title skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Button skeleton */}
                <div className="pt-2 flex justify-end">
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
