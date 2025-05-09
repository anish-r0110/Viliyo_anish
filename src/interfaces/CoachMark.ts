import { ReactNode } from "react";

export default interface CoachMark {
    heading:string
    targetId: string;
    content: string | ReactNode;
    headerAlignmentType : string;
}
  