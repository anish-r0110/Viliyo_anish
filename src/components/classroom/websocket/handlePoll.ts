import Payload from "../interfaces/Payload";

const handlePoll = ( payload:Payload) => {

    alert("Poll recieved");

    // Redux Poll Artichetur


    if( payload.sub_type == 'show_initial_screen' )
        console.log( JSON.parse(payload.poll_activity_data))
    if( payload.sub_type == "close_voting_broadcast" )
        alert('Closing voting broadcast');
    if( payload.sub_type == "show_initial_screen")
        alert('Start your screen');
    if( payload.sub_type == "completely_close_the_poll")
        alert('Closing the Poll');
 }





 export default handlePoll;