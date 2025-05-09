import React from "react";
import IEvent from "@/models/Event";
import GroupedEventList from "./GroupedEventList";
interface EventListProps {
  events: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {

  return <GroupedEventList events={events} />;
};

export default EventList;
