import { BsSearch } from "react-icons/bs";

interface ISearchInputProps {
  placeholder?: string;
  onChange: (text: string) => void;
  value?: string;
}

const SearchInput = ({ placeholder, onChange }: ISearchInputProps) => {
  return (
    <div className="relative w-[320px]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
        <BsSearch />
      </div>
      <input
        className="h-[40px] w-[320px] rounded-full pl-14"
        type="text"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default SearchInput;
