import { User } from "@/models/User";

export default interface IComment{
    id: number;
    author: User;
    content: string;
    timestamp: Date;
}