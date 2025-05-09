import Mode from "../model/Mode";
import SeatingStyle from "../model/SeatingStyle";

interface SessionSettings {
   
   mode : Mode;   // Mode of the session for eg. Networking or Break  ,  Instructor ,  Activity

   allowFreeSeatings : boolean;

   seatingStyle : SeatingStyle;

   video:boolean

   audio:boolean

   onSpeaker:boolean

   participantsPanel:boolean

   sessionPlanPanel:boolean;

   badgesPanel:boolean;

   whiteBoardPanel:boolean;

   notesPanel:boolean;

   totalActivePanels: 1 | 2 | 3;

   closeEntry:false ,

   muteParticipants:false,

   allowSharingScreen:false,

   recordingOptions:{
      recordSession:false,
      recordGroupInteraction:false
   }
}


export default SessionSettings;