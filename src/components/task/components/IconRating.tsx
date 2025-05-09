import React, { useState } from "react";
import Image from "next/image";
import Icon from "../../../assets/icons";

export enum IconShape  {
   Star = "Star" ,
   Thumsup = "Thumbs Up 👍" ,
   Heart = "Heart ❤️" ,
   Emoji = "Smiley 🙂"
}

interface StarRatingProps {
  outOf: number;
  rating?: number;
  size?: number;
  disabled?: boolean;
  onRatingChange?: (rating: string  ) => void;
  shapeType : IconShape
}

const IconRating: React.FC<StarRatingProps> = ({
  outOf,
  rating: initialRating = 0,
  size,
  disabled,
  onRatingChange,
   shapeType
}) => {
  const [rating, setRating] = useState(initialRating);
  let starSize = size ?? 24;

  let filledIcon = Icon.filledBlueStar;
  let unFilledIcon = Icon.unfilledBlueStar;;

  if( shapeType === IconShape.Emoji  ){
     filledIcon = Icon.filledEmoji;
     unFilledIcon = Icon.unfilledEmoji;
  }


  if( shapeType === IconShape.Heart ){
    filledIcon = Icon.filledHeart
    unFilledIcon = Icon.unfilledHeart;

  }

  if( shapeType === IconShape.Thumsup ){
      filledIcon = Icon.filledThumbsup;
      unFilledIcon = Icon.unfilledThumsup;
  }

  const handleStarClick = (selectedRating: number) => {
    if (!disabled) {
      setRating(selectedRating);
      if (onRatingChange) {
        onRatingChange(selectedRating.toString());
      }
    }
  };

  return (
    <div className="flex justify-center gap-1">
      {[...Array(outOf)].map((_, index) => {
        const starNumber = index + 1;
        const starImage = starNumber <= rating ? filledIcon : unFilledIcon;

        return (
          <span
            key={index}
            onClick={() => handleStarClick(starNumber)}
            style={disabled ? { cursor: "default" } : { cursor: "pointer" }}
          >
            <Image
              width={starSize}
              height={starSize}
              src={starImage}
              alt="Star"
              className="border border-black"
            />
          </span>
        );
      })}
    </div>
  );
};

export default IconRating;
