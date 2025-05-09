import IQuery from "@/interfaces/Query";
import Query from "./Query";


interface IQueriesTabProps {
    queries: IQuery[];
  }
  
  const QueriesTabContent = ({ queries }: IQueriesTabProps) => {
    return (
      <div className="w-2/3 mobile:w-full">
        {queries.map((query) => (
          <Query key={query.id} query={query}></Query>
        ))}
      </div>
    );
  };

export default QueriesTabContent