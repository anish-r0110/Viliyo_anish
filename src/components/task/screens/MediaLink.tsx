import Link from "next/link";
import { Text } from "@radix-ui/themes";

interface LinkProps {
  href: string;
}

const MediaLink = ({ href }: LinkProps) => {
  return (
    <div className="bg-purple-200 p-20 max-w-lg rounded-md justify-center items-center">
      <div className=" bg-purple-50 justify-center items-center rounded-md shadow-sm py-4 text-gray-500 px-3 mobile:text-xs flex flex-col">
        <Text className="text-xs text-app-blue ">
          Click to open in new window
        </Text>
        <Link className="text-lg text-black my-2" target="_blank" href={href}>
          {href}
        </Link>
      </div>
    </div>
  );
};

export default MediaLink;
