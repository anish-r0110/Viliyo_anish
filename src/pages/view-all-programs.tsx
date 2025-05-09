import { SearchInput } from "@/components/inputs";
import { ProgramList, ProgramListCard } from "@/components/program";
import { AppPage } from "@/layouts/types";
import { useEffect, useState } from "react";
import { FiBook, FiServer } from "react-icons/fi";
import ProgramService from "@/services/ProgramService";
import { BackNavigation } from "@/components/shared";
import { IProgram } from "@/models";

const ProgramOverview = ({ programs }: { programs: IProgram[] }) => {
  return (
    <div className="flex tablet:w-full flex-row gap-x-4 mobile:overflow-scroll scrollbar-thin mobile:w-full">
      <div className="py-6 flex flex-row w-[427px] mobile:min-w-[300px] bg-gradient-to-br from-app-blue to-app-purple from-30% rounded-xl items-center gap-4">
        <div className=" flex flex-1 text-app-yellow text-6xl items-end justify-end">
          <FiBook/>
        </div>
        <div className="flex flex-col flex-1 justify-between items-start  text-white text-3xl gap-1">
            <div className="flex text-4xl font-medium text-white items-start">{programs.length}</div>
            <div className="flex opacity-75 text-white text-base whitespace-nowrap">
              No. of programs
            </div>
        </div>
      </div>
      
      <div className="py-8 flex flex-row w-[427px] mobile:min-w-[300px] bg-gradient-to-br from-app-blue to-app-purple from-30% rounded-xl items-center gap-4">
        <div className=" flex flex-1 text-app-yellow text-6xl items-end justify-end">
          <FiServer />
        </div>
        <div className="flex flex-col flex-1 justify-between items-start  text-white text-3xl gap-1">
            <div className="flex text-4xl font-medium text-white items-start">{programs.reduce((sessions, el) => sessions + el.sessions.length, 0)}</div>
            <div className="flex opacity-75 text-white text-base whitespace-nowrap">
              No. of sessions
            </div>
        </div>
      </div>
    </div>
  );
};

const ViewAllPrograms: AppPage = () => {

  const programService = new ProgramService()

  const [programs, setPrograms] = useState<IProgram[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<IProgram[]>([]);
  const [filteredProgramsCard, setFilteredProgramsCard] = useState<IProgram[]>(
    []
  );
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    programService.getAllPrograms().then((programs) => {
      const activePrograms = programs.filter(program => program.status?.toLocaleLowerCase() !== "completed");
      setPrograms(activePrograms);
      setFilteredPrograms(activePrograms);
      setFilteredProgramsCard(activePrograms);
    });
  }, []);

  function handleOnChange(text: string) {
    setSearchText(text);
  }

  return (
    <div>
      <div className="">
        <BackNavigation title={"All Programmes"} />
      </div>
      <div className="mt-2">
        <ProgramOverview programs={programs}></ProgramOverview>
      </div>
      <div className="mt-4 mobile:w-full">
        <SearchInput
          placeholder="Search for a programme..."
          onChange={handleOnChange}
          value={searchText}
        />
      </div>

      {/* <div className="w-full mt-2">
        <GroupChipButton
          data={chipButtonData}
          onSelect={onSelect}
          style={"px-6"}
        />
      </div> */}
      <div className="w-full grid grid-auto-fit mobile:hidden tablet:hidden desktop:block">
        <ProgramList data={filteredPrograms} limit={100} />
      </div>
      <div className="w-full hidden mobile:grid mobile:grid-auto-fit tablet:grid tablet:grid-auto-fit mobile:mb-6">
        <ProgramListCard data={filteredProgramsCard} limit={100} />
      </div>
    </div>
  );
};

export default ViewAllPrograms;

ViewAllPrograms.Layout = "Admin";
