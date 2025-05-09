
import { useWindowSize } from "@/hooks";
import DesktopNavBar from "./Desktop";
import MobileNavBar from "./Mobile";


export default function NavBar() {
  
  const { width } = useWindowSize();

  return (
    <header>
      <nav className="" aria-label="Global">
        {width > 639 ? <DesktopNavBar /> : <MobileNavBar />}
      </nav>
    </header>
  );

}
