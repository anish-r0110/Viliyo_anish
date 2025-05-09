import { IViewCard } from "@/interfaces/DashboardOverview"




export const transformViewCardData = ( data:any ):IViewCard[] => {
     return  [
        { icon :"FiBook" ,   title:"No. of programmes" , value:data.no_of_programs },
        { icon :"FiServer" , title:"No. of sessions" , value:data.no_of_sessions },
        { icon :"FiUsers" , title:"No. of learning hours" , value:Number(data.no_of_learning_hours.replace(':','.'))  },
        { icon :"FiAward" , title:"No. of Badges", value:data.badges }
     ]
    
}