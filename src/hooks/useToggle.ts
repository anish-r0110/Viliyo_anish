import { useState } from "react"

const useToogle = ():[ value:boolean , toogle:() => void ] => {
    const [value , setToogle ] = useState(false)


    const toggle = ():void => {
       setToogle( value => !value)
    }

    return [ value , toggle ]
}


export default useToogle;