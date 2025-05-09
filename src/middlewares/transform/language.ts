import ILanguage from "@/interfaces/Language"

const transformLanguage = ( data:any ):ILanguage => {
    return {
        id:data.id ,
        name:data.languageName,
        status: data.active,
        isLaunching:false
    }
}

export default transformLanguage;