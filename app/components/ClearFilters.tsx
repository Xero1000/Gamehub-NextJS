"use client";

import { Button } from "@chakra-ui/react";
import useGameQueryStore from "../store";

const ClearFilters = () => {
  const resetFilters = useGameQueryStore((s) => s.resetFilters);

  return <Button onClick={() => resetFilters()}>Reset Filters</Button>;
};

export default ClearFilters;
