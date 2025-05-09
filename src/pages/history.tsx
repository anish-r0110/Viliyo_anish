import { AppPage } from "@/layouts/types";
import React, { useEffect, useState } from "react";
import { ProgramList, ProgramListCard } from "@/components/program";
import { IChipButton } from "@/components/buttons/ChipButton";
import { GroupChipButton } from "@/components/buttons";
import { SearchInput } from "@/components/inputs";
import IProgram from "@/models/Program";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCompletedPrograms } from "@/store/reducers/programs";



const HistoryPage: AppPage = () => {
  const [chipButtonData, setChipButtonData] = useState<IChipButton[]>([
    { id: 1, title: "All", isActive: true },
    { id: 2, title: "Behavioural", isActive: false },
    { id: 3, title: "Functional", isActive: false },
    { id: 4, title: "Technical", isActive: false },
    { id: 5, title: "Compliance", isActive: false },
    { id: 6, title: "Other", isActive: false },
  ]);

  const [selectedChip, setSelectedChip] = useState<IChipButton>({
    id: 1,
    title: "All",
    isActive: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { completedPrograms:programs } = useSelector(( state:RootState) => state.programs )

  const [filteredPrograms, setFilteredPrograms] = useState<IProgram[]>(programs);
  const [filteredProgramsCard, setFilteredProgramsCard] = useState<IProgram[]>(programs);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(getCompletedPrograms())
  }, []);


  useEffect(() => {
    applyFilter(selectedChip.title);
  }, [searchText, selectedChip]);

  const applyFilter = (category: string) => {
    const filteredByCategory =
      category.toLowerCase() === "all"
        ? programs
        : programs.filter(
            (program) =>
              program.category.toLowerCase() === category.toLowerCase()
          );

    if (searchText) {
      const filteredBySearchText = filteredByCategory.filter((program) =>
        program.name.toLowerCase().includes(searchText.trim().toLowerCase())
      );
      setFilteredPrograms(filteredBySearchText);
      setFilteredProgramsCard(filteredBySearchText);
    } else {
      setFilteredPrograms(filteredByCategory);
      setFilteredProgramsCard(filteredByCategory);
    }
  };

  const onSelect = (data: IChipButton) => {
    const newData = chipButtonData.map((el) => ({
      ...el,
      isActive: el === data,
    }));
    setChipButtonData(newData);
    setSelectedChip(data);

    applyFilter(data.title);
  };

  function handleOnChange(text: string) {
    setSearchText(text);
  }

  return (
    <div className="h-full w-full">
       <div>
          <div>
            <h1 className="font-bold text-2xl leading-8 text-zinc-700">
              You&apos;ve been doing well!
            </h1>
          </div>
          <div>
            <h1 className="font-normal text-lg mobile:text-sm leading-4 text-zinc-700">
              Take a look at your previously attended programmes.
            </h1>
          </div>
        </div>


      <div className="mt-4">
        <SearchInput
          placeholder="Search for a programme..."
          onChange={handleOnChange}
          value={searchText}
        />
      </div>

      <div className="w-full mt-4">
        <GroupChipButton
          data={chipButtonData}
          onSelect={onSelect}
          styles={"px-6"}
        />
      </div>
      <div className="w-full grid grid-auto-fit mobile:hidden tablet:hidden desktop:block mt-4">
        <ProgramList data={filteredPrograms} limit={100} />
      </div>
      <div className="w-full hidden mobile:grid mobile:grid-auto-fit tablet:grid tablet:grid-auto-fit mobile:mb-6">
        <ProgramListCard data={filteredProgramsCard} limit={100} />
      </div>
    </div>
  );
};

HistoryPage.Layout = "Admin";

export default HistoryPage;
