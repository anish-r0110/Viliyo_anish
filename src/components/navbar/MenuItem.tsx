import { IconType } from "react-icons/lib";


interface Props {
    icon: IconType;
    label: string;
    onClick?: () => void;
  }
  


const MenuItem: React.FC<Props> = ({ icon: Icon, label, onClick }) => {
    return (
      <button
        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
        onClick={onClick}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </button>
    );
  };


export default MenuItem