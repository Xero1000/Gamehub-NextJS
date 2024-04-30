import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

// Skeleton placeholder while GameCards are loading
const GameCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
