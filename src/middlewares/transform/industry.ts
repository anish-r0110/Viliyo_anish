import IIndustry from "@/interfaces/Industry";


const transformIndustry = ( data:any):IIndustry => {
    return {
        id:data.id ,
        name:data.data_name
    }
}


export default transformIndustry;