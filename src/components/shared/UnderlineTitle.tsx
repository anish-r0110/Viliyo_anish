const UnderLineTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full">
      <div className="text-app-blue mt-4 ">{title}</div>

      <div className="mb-2 mobile:m-2">
        <hr className="bg-app-blue h-[1px]"></hr>
      </div>
    </div>
  );
};

export default UnderLineTitle;
