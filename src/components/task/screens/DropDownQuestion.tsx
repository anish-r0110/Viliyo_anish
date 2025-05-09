import { Box, Button, DropdownMenu, Flex, Select } from "@radix-ui/themes";
import { FaAngleDown } from "react-icons/fa";


export const DropDownQuestion = ({
  element,
  index,
  onSelect
}: {
  element: any; index:number , onSelect:( option:any , index :number ) => void }) => {
  


    const getDefault = ( ) => {
      const index = element.answer.findIndex( (el:any) => el.isAnswer );
      if( index != -1 ) return element.answer[index].value;
      return null
    }


  return (
    <Flex direction={"column"} justify={"center"}>
      <label className="text-base font-medium mb-3">{element.question}
       {element.Mandatory && <span className="text-red-600">*</span>}
      </label>

      <Box>
      <Select.Root onValueChange={(value) => { if( value ) onSelect(value , index) } } defaultValue={getDefault()}>
          <Select.Trigger />
          <Select.Content>
          <Select.Group>
            <Select.Item value={null} >Please Select</Select.Item>
            { element.answer.map( (item:any) => (<Select.Item value={item.value} key={item.answerId}>{item.value}</Select.Item>)) }
          </Select.Group>
          <Select.Separator />
        
        </Select.Content>   
      </Select.Root>
      </Box>
     

    </Flex>
  );
};

export default DropDownQuestion