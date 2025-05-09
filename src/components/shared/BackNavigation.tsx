import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { Flex, Text } from "@radix-ui/themes";

interface IBackNavigationProps {
  title: string;
}

const BackNavigation = ({ title }: IBackNavigationProps) => {
  const router = useRouter();
  return (
    <Flex my="3" className="w-full p-1 px-2">
      <BiArrowBack
        className="hover:scale-125 cursor-pointer"
        size={30}
        onClick={() => router.back()}
      />
      <Text className="px-4 font-bold  text-xl "> {title} </Text>
    </Flex>
  );
};

export default BackNavigation;
