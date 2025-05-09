import { PropsWithChildren } from "react";
import Icon from "@/assets/icons";
import Image from "next/image";

const GuestLayout = (props: PropsWithChildren) => {
  const backgroundImage = "/img/background.png";

  return (
    <div className="bg-white mt-16 rounded-t-2xl h-screen grid grid-cols-2">
      <div
        className=" bg-cover bg-center bg-no-repeat p-10 mobile:hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Image width={150} src={Icon.secondLogo} alt="Icon Image" />
      </div>
      <div className="bg-[#F1F3FF] mobile:col-span-2 rounded-t-2xl ">
        {props.children}
      </div>
    </div>
  );
};

export default GuestLayout;
