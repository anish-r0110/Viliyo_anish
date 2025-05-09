import { Heading } from "@radix-ui/themes";
import Tabs, { ITabs } from "../tabs/Tabs";

interface ISessionTabsProps {
  sessions: ITabs;
}

const SessionTabs = ({ sessions }: ISessionTabsProps) => {
  return (
    <>
      <div className="text-md font-semibold text-app-blue">
        Sessions
      </div>
      <Tabs data={sessions} />
    </>
  );
};

export default SessionTabs;
