// IconRating.tsx

import React from "react";

interface IconRatingProps {
  emptyIcon: string;
  filledIcon: string;
  totalRating: number;
  rating: number;
  question: string; // Question is now a required prop
  isMandatory?: boolean; // isMandatory is an optional prop
}

const IconRating: React.FC<IconRatingProps> = ({
  emptyIcon,
  filledIcon,
  totalRating,
  rating,
  question,
  isMandatory = false,
}) => {
  // Logic to determine how many filled and empty icons to display based on the rating

  const renderIcons = () => {
    const icons = [];

    for (let i = 1; i <= totalRating; i++) {
      if (i <= rating) {
        icons.push(<img key={i} src={filledIcon} alt={`Filled Icon ${i}`} />);
      } else {
        icons.push(<img key={i} src={emptyIcon} alt={`Empty Icon ${i}`} />);
      }
    }

    return icons;
  };

  return (
    <div>
      <p>
        {question} {isMandatory && <span style={{ color: "red" }}>*</span>}
      </p>
      <div>{renderIcons()}</div>
    </div>
  );
};

export default IconRating;
