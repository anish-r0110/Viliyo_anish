import IAgeGroup from "@/interfaces/AgeGroup";

const transformAgeGroup = ( data:any ):IAgeGroup => {
  return {
     id:data.id ,
     ageRange: data.age_group
  }
}

export default transformAgeGroup;