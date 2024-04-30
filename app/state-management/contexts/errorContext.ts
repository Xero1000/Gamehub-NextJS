import { createContext, Dispatch, SetStateAction } from "react"

/**
 * Context for managing errors
 * Structure contains boolean flag for checking if an error occured,
 * an error message, and functions to set them. 
 */

interface errorContextType {
    errorOccured: boolean
    setErrorOccured: Dispatch<SetStateAction<boolean>>
    message: string
    setMessage: Dispatch<SetStateAction<string>>
}

const errorContext = createContext<errorContextType>({} as errorContextType)

export default errorContext