import { useState } from "react"


const useLoader = () => {
    const loading = useState<boolean>( false );

    return loading
}

export default useLoader