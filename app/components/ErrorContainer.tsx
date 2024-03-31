import { Box, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const ErrorContainer = ({ children }: Props) => {
  return (
    <Box>
      <Heading>Oops</Heading>
      {children}
    </Box>
  )
}

export default ErrorContainer