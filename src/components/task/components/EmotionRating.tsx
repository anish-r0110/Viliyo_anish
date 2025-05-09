import { FeedbackQuestion } from "@/models/Task";
import { Box, Flex, Heading } from "@radix-ui/themes";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaRegSadTear,
  FaAngry,
  FaFrown,
  FaMeh,
  FaRegSurprise,
  FaSmile,
} from "react-icons/fa";
import Icon from "@/assets/icons";

type Emotion = "cry" | "upset" | "neutral" | "happy" | "smile";

interface EmotionRatingProps {
  element: FeedbackQuestion;
  onChange: (emotion: Emotion) => void;
}

const EmotionRating: React.FC<EmotionRatingProps> = ({ onChange, element }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | undefined>(
    element.answer
  );

  const handleEmotionChange = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    onChange(emotion);
  };

  return (
    <Box>
      <Heading>{element.question}</Heading>
      <Flex gap="3">
        <Box className="flex hover:scale-110 flex-col items-center">
          <button onClick={() => handleEmotionChange("cry")}>
            <Image
              src={
                selectedEmotion === "cry" ? Icon.cryEmojiFilled : Icon.cryEmoji
              }
              alt="Cry Emoji"
            ></Image>
          </button>
        </Box>
        <Box className="flex hover:scale-110 flex-col items-center">
          <button onClick={() => handleEmotionChange("upset")}>
            <Image
              src={
                selectedEmotion === "upset"
                  ? Icon.upsetEmojiFilled
                  : Icon.upsetEmoji
              }
              alt="Upset Emoji"
            ></Image>
          </button>
        </Box>

        <Box className="flex hover:scale-110 flex-col items-center">
          <button onClick={() => handleEmotionChange("neutral")}>
            <Image
              src={
                selectedEmotion === "neutral"
                  ? Icon.neautralEmojiFilled
                  : Icon.neautralEmoji
              }
              alt="Neutral Emoji"
            ></Image>
          </button>
        </Box>
        <Box className="flex hover:scale-110 flex-col items-center">
          <button onClick={() => handleEmotionChange("happy")}>
            <Image
              src={
                selectedEmotion === "happy"
                  ? Icon.happyEmojiFilled
                  : Icon.happyEmoji
              }
              alt="Happy Emoji"
            ></Image>
          </button>
        </Box>
        <Box className="flex hover:scale-110 flex-col items-center">
          <button onClick={() => handleEmotionChange("smile")}>
            <Image
              src={
                selectedEmotion === "smile"
                  ? Icon.smileEmojiFilled
                  : Icon.smileEmoji
              }
              alt="Happy Emoji"
            ></Image>
          </button>
        </Box>
      </Flex>
    </Box>
  );
};

export default EmotionRating;
