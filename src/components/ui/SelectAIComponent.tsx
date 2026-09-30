import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PROMPTS_AI } from "../../constants/prompts";

interface SelectAIProps {
  selectAILabel: (value: string) => void;
  value: string;
}

export const SelectAIComponent = ({ selectAILabel, value }: SelectAIProps) => {
  return (
    <Select value={value} onValueChange={(val) => selectAILabel(val ?? "")}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {PROMPTS_AI.map((item) => (
            <SelectItem key={item.id} value={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
