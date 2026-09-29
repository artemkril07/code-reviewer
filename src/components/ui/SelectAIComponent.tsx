import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {PROMPTS_AI} from "../../constants/prompts" 

interface SelectAIProps{
  setAiID: (value: string)=> void 
}

export const SelectAIComponent = ( {setAiID} :SelectAIProps)=>  {


  return (
    <Select onValueChange={(val: string) => {
  console.log("Обраний ID:", val);
  setAiID(val);
}}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {PROMPTS_AI.map((item) => (
            <SelectItem key={item.id} value={item.label} onClick= {()=> { console.log(item.id)}
            } >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
