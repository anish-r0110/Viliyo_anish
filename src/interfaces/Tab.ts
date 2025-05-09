import { ReactNode } from "react";

export default interface Tab {
    id: string;
    label: string;
    icon?:ReactNode;
    content: ReactNode;
}