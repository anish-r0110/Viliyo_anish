import { ERightPanel } from "../../enums/panels";

export default interface MenuProps {
    onClick?: ( panel:ERightPanel| null ) => void;
    onClickAction : Function
}