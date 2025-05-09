import React, { useState } from "react";
import Image from "next/image";
import Icon from "../../assets/icons";

interface StarRatingProps {
  outOf: number;
  rating?: number;
  size?: number;
  disabled?: boolean;
  onRatingChange?: (rating: string) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  outOf,
  rating: initialRating = 0,
  size,
  disabled,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  let starSize = size ?? 24;

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
        const starImage =
          starNumber <= rating ? Icon.filledStar : Icon.unfilledStar;

        return (
          <span
            key={index}
            className="hover:scale-110"
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

export default StarRating;
