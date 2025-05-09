import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import heart from "@/assets/images/heart.png";
import handbye from "@/assets/images/handbye.png";
import clap from "@/assets/images/clap.png";
import thumbsup from "@/assets/images/thumbsup.png";
import smiley from "@/assets/images/smily.png";
import percentage from "@/assets/images/percentage.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useSocket from "../../websocket/useSocket";


interface Emoji {
   name:string;
   emoji: StaticImageData;
}


interface EmojiProps {
  item:Emoji;
  onClick: (emoji: Emoji) => void;
}

const Emoji = ({item, onClick }: EmojiProps ) => {
  return (
    <div
      className="m-4 hover:scale-125 cursor-pointer transition-all"
      onClick={() => onClick(item)}
    >
     <Image src={item.emoji} alt="" height={80} width={80}></Image>
    </div>
  );
};

const ReactionPanel = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<StaticImageData | null>(null);
  const { live:{ settings } , auth } = useSelector( (state:RootState)=> state )
  const socket = useSocket()

  const emojis:Emoji[] = [  
                    { name:'heart' , emoji:heart }, 
                    { name:'clap' , emoji:clap }, 
                    { name:'100' , emoji:percentage }, 
                    { name:'thumbs_up' , emoji:thumbsup }, 
                    { name:'smiley' , emoji:smiley }, 
                    { name:'high_five' , emoji:handbye }, 
                 ];

  const chooseEmoji = (element: Emoji) => {

    const payload = 
    { 
      type :"show_emojies",
      user_reaction_data:{ 
        reaction_type : element.name , 
        reacted_by : auth.user?.email,
        reacted_by_type:"trainee"
      },
      room_id :settings.roomId,
      timestamp:565
    }

    socket.sendMessage( payload );



    setSelectedEmoji(element.emoji);
    setTimeout(() => {
      setSelectedEmoji(null);
    }, 2000);
  };

  return (
    <div className="bg-app-gray-medium p-0 rounded-2xl ">
      <div className="grid grid-cols-3 bg-app-gray-medium">
        {emojis.map((el, index) => (
          <Emoji key={index} item={el} onClick={chooseEmoji} />
        ))}
      </div>

      <div className="fixed left-0 bottom-0 z-99">
        { selectedEmoji && <Image src={selectedEmoji} alt="" height={30} width={30}></Image> }
      </div>

    </div>
  );
};

export default ReactionPanel;
