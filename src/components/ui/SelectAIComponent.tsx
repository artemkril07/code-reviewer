import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const items = [
  { label: "Select type of response", value: null },
  { label: "Full Code Review", value: "Full Code Review" },
  { label: "Optimize & Refactor", value: "Optimize & Refactor" },
  { label: "Find Bugs & Vulnerabilities", value: "Find Bugs & Vulnerabilities" },
  { label: "Generate Unit Tests", value: "Generate Unit Tests" },
]

export const SelectAIComponent = ()=> {
  return (
    <Select items={items}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
