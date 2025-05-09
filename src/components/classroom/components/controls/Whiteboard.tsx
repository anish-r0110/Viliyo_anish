import useToogle from "@/hooks/useToggle";
import { TfiBlackboard } from "react-icons/tfi";
import CLASSNAME from "./classname";
import SIZE from "./size";
import MenuProps from "./MenuProps";
import { ERightPanel } from "../../enums/panels";


const WhiteBoardControl = ({onClick}:MenuProps) => {
    const [isOn , toogleWhiteboard ] = useToogle();
    return( <div className={`${CLASSNAME} ${ !isOn && 'bg-white'} `} onClick={() =>{
        onClick(ERightPanel.Whiteboard)
        toogleWhiteboard();
    }}>
                     <TfiBlackboard color="black" size={SIZE} />
     </div>)
 }

 export default WhiteBoardControl;