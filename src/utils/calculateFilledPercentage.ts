import { User } from "@/models/User";



export default function calculateFilledPercentage(user: User): number {

    const excludeKeys: (keyof User)[] = ['facebook', 'instagram' ,'youtube']; // Keys to exclude from calculation
  
    const keys = Object.keys(user) as (keyof User)[];
    const filteredKeys = keys.filter(key => !excludeKeys.includes(key));
    const totalKeys = filteredKeys.length;
    const filledKeys = filteredKeys.filter(key => user[key] !== '' && user[key] !== null && user[key] !== undefined).length;
  
    // Calculate the percentage and round it to the nearest whole number
    const percentage = (filledKeys / totalKeys) * 100;
    return Math.round(percentage); // or use Math.floor(percentage) or Math.ceil(percentage)
  }
  