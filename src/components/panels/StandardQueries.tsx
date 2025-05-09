import { FaHandPaper } from "react-icons/fa";

const Query = ({
  title,
  onClick,
}: {
  title: string;
  onClick: (query: string) => void;
}) => {
  return (
    <div
      onClick={() => {
        onClick(title);
      }}
      className="text-white hover:scale-105 cursor-pointer ease-in-out px-3 m-2 flex space-x-2 items-center border-2 border-white rounded-2xl text-center"
    >
      <FaHandPaper />
      <span>{title}</span>
    </div>
  );
};

const StandardQueriesPanel = ({onSelect}:{ onSelect:(query:string) => void }) => {
  const queries = [
    "Raise Hand to ask a question",
    "I didn't understand. Please repeat?",
    "Could you give us an example?",
    "Can I share an example?",
    "Could you explain this little more?",
    "May I share a different perspective?",
    "Could you please go slower?",
  ];



  return (
    <div className="bg-app-gray-medium p-5 flex flex-wrap rounded-2xl">
      {queries.map((query) => (
        <Query onClick={onSelect} key={query} title={query}></Query>
      ))}
    </div>
  );
};

export default StandardQueriesPanel;
