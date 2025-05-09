
export interface IViewCard {
    icon:string , title:string , value:number 
}

export interface IProgressCard{
    icon:string ,
    title:string ,
    value:number ,
    incrementValue?:number
}

export interface IRatingCard {
    title:string,
    outOf:number,
    rating:number
}


export default interface DashboardOverview{
    viewCard:IViewCard[],
    progressCard:IProgressCard[],
    ratingCard: IRatingCard[]
}