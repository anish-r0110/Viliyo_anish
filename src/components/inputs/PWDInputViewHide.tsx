import PasswordInputVH from "./PasswordInputVH";

interface PWDInputViewHideProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const PWDInputViewHide: React.FC<PWDInputViewHideProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const handlePasswordChange = (value: string) => {
    onChange(value); // Call the parent component's onChange function
  };

  return (
    <div>
      <PasswordInputVH
        label=""
        value={value}
        onChange={handlePasswordChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default PWDInputViewHide;
