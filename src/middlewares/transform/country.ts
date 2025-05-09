import ICountry from "@/interfaces/Country"


const transformCountry = (data:any):ICountry => {
    return {
        id: data.id  ,
        name : data.country_name
    }
}

export default transformCountry;