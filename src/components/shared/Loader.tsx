import React from "react";
import { RiLoader5Fill } from "react-icons/ri";

const Loader = ({ size }: { size: number }) => (
  <span className="mx-[2%]">
    <RiLoader5Fill className="animate-spin" size={size} />
  </span>
);


export default Loader;