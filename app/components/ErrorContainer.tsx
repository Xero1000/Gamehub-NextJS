import { Box, Heading } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const ErrorContainer = ({ children }: Props) => {
  return (
    <Box padding={5}>
      <Heading>Oops</Heading>
      {children}
    </Box>
  )
}

export default ErrorContainer