import { main } from "@popperjs/core";
import { ReactElement } from "react";

const DefaultLayout = ({ children }: { children: ReactElement }) => {
  return <main>{children}</main>;
};

export default DefaultLayout;
