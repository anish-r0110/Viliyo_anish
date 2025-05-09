import GuestLayout from "./GuestLayout";
import AdminLayout from "./AdminLayout";
import { PropsWithChildren } from "react";
import ConsoleLayout from "./Console";
import DefaultLayout from "./DefaultLayout";

export const Layouts = {
  Admin: AdminLayout,
  Guest: GuestLayout,
  Console: ConsoleLayout,
  Default: DefaultLayout,
};

export type LayoutKeys = keyof typeof Layouts;

const NoLayout = (props: PropsWithChildren) => {
  return (
    <>
      <nav className="h-20 bg-black fixed top-0"></nav>
      {props.children}
    </>
  );
};

export default NoLayout;
