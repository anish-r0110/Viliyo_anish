import axiosInstance from "@/config/axios";
import DashboardOverview, { IProgressCard, IRatingCard, IViewCard } from "@/interfaces/DashboardOverview";
import { transformViewCardData } from "@/middlewares/transform/transformOverview";

const ratingCard:IRatingCard[] = [
  { "title":"My Rating" , "outOf":5, "rating":0 },
  { "title":"Group Rating" , "outOf":5, "rating":0  }
]

const progressCard: IProgressCard[] = [
  { title:"My Engagement Score" , incrementValue:0 , icon:''  , value:0 },
  { title:"Batch Engagement Score" , incrementValue:0 , icon:'' ,value:0 },
  
]

const viewCard:IViewCard[] = [ { icon :"FiBook" ,   title:"No. of programmes" , value: 0 },
{ icon :"FiServer" , title:"No. of sessions" , value:0 },
{ icon :"FiUsers" , title:"No. of learning hours" , value: 0  },
{ icon :"FiAward" , title:"No. of Badges", value: 0 }

]

export default class DashboardService{
  
    async getDashboardData(): Promise<DashboardOverview> {

        try {

          let  response:any = await axiosInstance.get('trainee/dashboard_overview/' , { data:{ id:192 }} );
          const viewCard  = transformViewCardData( response.response.data );
          return { viewCard:viewCard, progressCard:progressCard , ratingCard:ratingCard }
            
        }
        catch( error ) {
            console.log("🚀 ~ file: DashboardService.ts:36 ~ DashboardService ~ getDashboardData ~ error:", error)
            
        }

       
       
    }
  }
  