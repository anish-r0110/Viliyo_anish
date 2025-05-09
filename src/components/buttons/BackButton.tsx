import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";

export const BackButton = ({
  size,
  link = "/dashboard",
}: {
  size: number;
  link: string;
}) => {
  const router = useRouter();
  return <AiOutlineArrowLeft size={size} onClick={() => router.push(link)} />;
};
