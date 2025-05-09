import IEmoji from "@/interfaces/Emoji";




interface Props {
    data: IEmoji;
    onSelect : (data: IEmoji) => void;
}
  

const Emoji = ({ data, onSelect }: Props) => {
    let classes = data.isActive ? "text-pink-500" : "text-app-blue";
  
    return (
      <div
        className={` text-2xl cursor-pointer hover:animate-bounce hover:text-amber-500 ${classes}`}
        onClick={() => onSelect(data)}
      >
        {data.smiley}
      </div>
    );
};

export default Emoji