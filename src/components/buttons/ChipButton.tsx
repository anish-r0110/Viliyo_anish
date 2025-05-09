export interface IChipButton {
  id: number;
  title: string;
  isActive: boolean;
}

interface IChipButtonProps {
  data: IChipButton;
  onClick: (data: IChipButton) => void;
}

export const ChipButton = ({ data, onClick }: IChipButtonProps) => {
  let classes = data.isActive
    ? "bg-gradient-to-br from-app-blue to-app-purple from-30% border-app-blue text-white text-xs font-semibold"
    : "border border-app-gray-medium text-app-gray-medium text-xs font-semibold";

  return (
    <button
      className={`  h-[32px]  rounded-[28px]  text-center font-normal px-4 shadow-sm ${classes}`}
      onClick={() => onClick(data)}
    >
      {data.title}
    </button>
  );
};

export default ChipButton;
