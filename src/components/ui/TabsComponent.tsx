import { CodeIcon, CodeXml, FileBracesCorner } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
// import { useState } from "react";
interface TabsProps {
  changeState: (value: string)=> void 
}
export const TabsComponent = ({changeState}:TabsProps) => {

  // const [stateComponent, setStateComponent] = useState<string>("");

  const handleState = (value: string): void =>{
   changeState(value); 
  }

  return (
     <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="javascript" onClick={()=>handleState("javascript")}>
                <CodeIcon />
                JavaScript
              </TabsTrigger>
              <TabsTrigger value="python" onClick={()=>handleState("python")}>
                <CodeIcon />
                Python
              </TabsTrigger>
              <TabsTrigger value="html" onClick={()=>handleState("html")}>
                <CodeXml />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" onClick={()=>handleState("css")}>
                <FileBracesCorner />
                CSS
              </TabsTrigger>
            </TabsList>
          </Tabs>
  )
}
