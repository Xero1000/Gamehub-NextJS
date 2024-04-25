import { createContext, Dispatch, SetStateAction } from "react"

interface errorContextType {
    errorOccured: boolean
    setErrorOccured: Dispatch<SetStateAction<boolean>>
    message: string
    setMessage: Dispatch<SetStateAction<string>>
}

const errorContext = createContext<errorContextType>({} as errorContextType)

export default errorContext