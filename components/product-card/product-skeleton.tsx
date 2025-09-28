import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import React, { memo } from "react";

const ProductSkeleton = () => {
  return (
    <Card className="h-full flex-1">
      <Box className="aspect-square mb-4 relative">
        <Skeleton className="w-full h-full rounded-lg" />
        <Box className="absolute top-2 left-2">
          <Skeleton className="w-16 h-6 rounded-full" />
        </Box>
      </Box>

      <VStack space="sm" className="p-4 flex-1">
        <Box className="min-h-[3rem]">
          <SkeletonText _lines={2} className="h-5 rounded" />
        </Box>

        <Box className="min-h-[4.5rem]">
          <SkeletonText _lines={3} className="h-4 rounded" />
        </Box>

        <HStack className="justify-between items-center mt-auto pt-3">
          <Skeleton className="w-20 h-6 rounded" />
          <Skeleton className="w-24 h-8 rounded-md" />
        </HStack>
      </VStack>
    </Card>
  );
};

export default memo(ProductSkeleton);
