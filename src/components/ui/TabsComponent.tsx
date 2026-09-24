import { CodeIcon, CodeXml, FileBracesCorner } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export const TabsComponent = () => {


  return (
     <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="javascript">
                <CodeIcon />
                JavaScript
              </TabsTrigger>
              <TabsTrigger value="python">
                <CodeIcon />
                Python
              </TabsTrigger>
              <TabsTrigger value="html">
                <CodeXml />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css">
                <FileBracesCorner />
                CSS
              </TabsTrigger>
            </TabsList>
          </Tabs>
  )
}
