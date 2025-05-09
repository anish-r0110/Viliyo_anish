import { ReactNode } from "react";

export default interface IEmoji {
    id: number;
    smiley: ReactNode;
    isActive: boolean;
}