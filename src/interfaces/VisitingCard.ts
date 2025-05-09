import { ReactNode } from "react";

export interface VisitingCardListData {
  id?: number;
  traineeId?: number;
  name?: string;
  phone?: number;
  email?: string;
  linkedIn?: string;
  website?: string;
  about?: string;
  designation?: string;
  interest?: string;
  isDefault?: boolean;
  layout?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}



export interface VisitingCard {
  visitingCardList: VisitingCardListData[];
  id?: number;
  traineeId: number;
  name: string;
  phone: number;
  email: string;
  linkedIn?: string;
  website?: string;
  about?: string;
  designation?: string;
  interest?: string;
  isDefault: boolean;
  layout?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  profileImage?: any;
}

export interface Layout {
  front: (data: VisitingCard) => ReactNode;
  back: (data: VisitingCard) => ReactNode;
}
