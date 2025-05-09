import { Layout } from "@/interfaces/VisitingCard";
import { User } from "@/models/User";

export interface EditableVisitingCardProps {
  layout: Layout;
  data: User;
  isDefault : boolean;
  isFlip?: boolean;
  setDefault?: () => void;
}

const EditableVisitingCard = ({
  layout,
  data,
  isDefault,
  setDefault
}: any) => {

  return (
    <div className="w-full grid grid-cols-3 desktop:grid-cols-5 mobile:flex mobile:flex-col mobile:justify-center largescreen:grid-cols-7 laptop:grid-cols-5 tablet:grid-cols-1 space-x-2 space-y-2 mobile:-space-x-0.5 tablet:-space-x-0.5 ">
      <div className="col-span-2 ">{layout.front(data)}</div>
      <div className="col-span-2 ">{layout.back(data)}</div>

      <div className="tablet:px-6 space-y-2 ">
        {isDefault ? (
          <button className="border-2 border-app-yellow bg-app-yellow rounded-full  text-white  px-2 w-full h-8 hover:scale-105 text-xs mobile:w-full ">
            Default Visiting Card
          </button>
        ) : (
          <button
            onClick={() => setDefault(data.id)}
            className="border-2 border-app-blue bg-app-blue text-white rounded-full font-bold  px-2 w-full h-8 hover:scale-105 text-xs mobile:w-full  "
          >
            Set as Default
          </button>
        )}
      </div>
    </div>
  );
};
export default EditableVisitingCard;