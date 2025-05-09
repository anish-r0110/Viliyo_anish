import { ReactNode, useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export interface ITab {
  id: number;
  TabContent: ReactNode;
}

export interface ITabs {
  [key: string]: ITab[];
}

interface ITabsProps {
  data: ITabs;
}

export default function Tabs({ data }: ITabsProps) {
  const [tabs] = useState<ITabs>(data);
  return (
    <div className="w-full ">
      <Tab.Group>
        <Tab.List className="flex mobile:w-full overflow-x-auto border-b-2 border-purple-900 scrollbar-thin">
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "mr-1 w-fit  font-medium text-sm cursor-pointer whitespace-nowrap",
                  selected
                    ? "text-center border-purple-900 border rounded-t-md px-4 bg-purple-900 text-white focus:outline-none focus:text-white focus:font-normal focus:border-purple-900"
                    : "border-purple-900 border border-b-0 rounded-t-md  px-4 py-1 text-purple-900 font-normal  hover:text-purple-900 hover:border-purple-900 focus:text-purple-900 focus:border-purple-900"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 overflow-y-auto max-h-screen scrollbar-thin scroll-smooth">
          {Object.values(tabs).map((posts, index) => (
            <Tab.Panel key={index}>
              {posts.map((item) => {
                return <div key={item.id} className="text-sm">{item.TabContent}</div>;
              })}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
