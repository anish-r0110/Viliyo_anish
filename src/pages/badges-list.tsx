import Tabs, { ITabs } from "@/components/Tabs";
import { AppPage } from "@/layouts/types";

import axios from "axios";
import { useEffect, useState } from "react";

const Screen = ({ data }: { data: IBadge[] }) => {
  return (
    <ul>
      {data.map((el, index) => (
        <li key={index}>Badge</li>
      ))}
    </ul>
  );
};

type BadgeType = "teamPlayer" | "brilliantEffort" | "topContributor";

interface BadgeProps {
  type: BadgeType;
  label: string;
}

interface BadgesProps {
  badges: BadgeProps[];
}

const Badge: React.FC<BadgeProps> = ({ type, label }) => {
  let imageSrc = "";

  switch (type) {
    case "teamPlayer":
      imageSrc = "team-player-image.jpg";
      break;
    case "brilliantEffort":
      imageSrc = "brilliant-effort-image.jpg";
      break;
    case "topContributor":
      imageSrc = "top-contributor-image.jpg";
      break;
    default:
      break;
  }

  return (
    <div className={`badge badge-${type}`}>
      <img src={imageSrc} alt={label} />
      <span>{label}</span>
    </div>
  );
};

interface IBadge {
  slug: string;
  name: string;
  senderName: string;
}

interface IUser {
  name: string;
}

interface IAward {
  recieved: IBadge[];
  shared: IBadge[];
}

const BadgeListPage: AppPage = () => {
  const [awards, setAwards] = useState<IAward>({ shared: [], recieved: [] });

  useEffect(() => {
    axios.get("data/badges-list.json").then((resp) => {
      const transformBadge = (data: any): IBadge => ({
        slug: (data.achievementName as string).trim().toLowerCase(),
        name: data.achievementName,
        senderName: data.senderName,
      });

      const recievedBadges = resp.data.data.getBadge.map((el: any) =>
        transformBadge(el)
      );
      setAwards({
        ...awards,
        recieved: [...awards.recieved, ...recievedBadges],
      });

      console.log(resp.data.data.getBadge);
    });
  }, []);

  const data: ITabs = {
    "Badges Received": [
      { id: 1, TabContent: <Screen data={awards?.recieved}></Screen> },
    ],
    "Badges Shared with Other": [
      { id: 2, TabContent: <Screen data={awards?.shared}></Screen> },
    ],
  };

  return (
    <div className="h-screen">
      <Tabs data={data}></Tabs>
    </div>
  );
};

export default BadgeListPage;
BadgeListPage.Layout = "Admin";
