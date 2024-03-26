import { HStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

const GenreListContainer = ({ children }: Props) => {
  return (
    <HStack paddingY="5px">
        {children}
    </HStack>
  )
}

export default GenreListContainer