import { DropdownMenu, Flex } from "@radix-ui/themes";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";


interface Option {
  answerId: number;
  value: string;
  isAnswer:string;
  rank?:number
}

interface RankOrderQuestionProps {
  element: any;
  elementIndex:number;
  question: string;
  options: Option[];
  onRank:( options:any , index:number ) => void;
  numberOfOptiontoRank?:number
}

export const RankOrderQuestion: React.FC<RankOrderQuestionProps> = ({ question , options , onRank , elementIndex , element , numberOfOptiontoRank }) => {
  
  const [rankOptions , setRankOptions] = useState( options )
  
  let lengthOfRank = ( numberOfOptiontoRank ) ? numberOfOptiontoRank : rankOptions.length
 
  let ranks = [];

  for (let i = 1; i <= lengthOfRank; i++) {
    ranks.push(i);
  }
  
  const updateSelection = (rank: number, option:Option ) => {
    
      setRankOptions( produce( options =>{
          
           options = options.map( el => {
            if( el.rank == rank && el.answerId != option.answerId ){
                el.rank = 0
            }
            else if( el.answerId == option.answerId){
              el.rank = rank
            }
            return el
          })
      }))
      console.log('Rank Options', rankOptions );
      onRank( rankOptions , elementIndex )
  };

  useEffect(() => {

    () => {
      onRank( rankOptions , elementIndex )
    }

  },[])

  return (
    <Flex direction="column" gap="3" style={{ maxWidth: 700 }}>
      <label className="block mb-2 text-normal font-bold text-app-gray-medium ">
        {question}
        {element.Mandatory && <span className="text-red-600">*</span>}
      </label>
      {rankOptions.map((item: Option) => (
        <Flex key={item.answerId} justify={"between"} gap={"2"}>
          <div className="w-full break-words border rounded-xl px-2 py-2">
            {item.value}
          </div>
          <div className="my-auto">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button className="flex gap-2 px-2 py-2 border min-w-[50px] rounded-md">
                  { item.rank ? item.rank : '-' } 
                  <span className="my-auto">
                    <FaAngleDown />
                  </span>
                </button> 
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                { ranks.map( el => 
                    (<DropdownMenu.Item
                          key={ el}
                          onClick={(e) => {
                            updateSelection(el, item);
                          }}
                        >
                          {el}
                      </DropdownMenu.Item>)) 
              }
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </Flex>
      ))}
    </Flex>
  );
};

export default  RankOrderQuestion;