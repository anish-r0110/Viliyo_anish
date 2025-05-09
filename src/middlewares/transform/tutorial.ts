import Video from "@/interfaces/Video";


const transformTutorial = ( data:any ):Video => ({
    id:data.id ,
    thumbnail: data.thumbnail ?? 'https://img.youtube.com/vi/dXo0LextZTU/0.jpg',
    title:data.title,
    url: data.file ?? 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description:data.video_description,
    duration:data.duration,
    created_at:data.created_at 
})


export default transformTutorial;