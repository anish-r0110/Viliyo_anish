import ChipButton, { IChipButton } from "./ChipButton";

interface IGroupChipButtonProps {
  data: IChipButton[];
  onSelect: (selectedChip: IChipButton) => void;
  disabled?: boolean;
  styles?: string;
}

const GroupChipButton = ({ onSelect, data }: IGroupChipButtonProps) => {
  function handleClick(chipButton: IChipButton) {
    onSelect(chipButton);
  }
  return (
    <div className="flex  gap-2 overflow-x-auto scrollbar-thin ">
      {data.map((chipButton) => (
        <ChipButton
          key={chipButton.id}
          data={chipButton}
          onClick={handleClick}
        ></ChipButton>
      ))}
    </div>
  );
};

export default GroupChipButton;
