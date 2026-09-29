import { useState, type FC } from "react";
import { type CodeInputProps } from "../types/index.ts";
import { sendRequest } from "../api/apiRequest.ts";
import { CodeEditor } from "./CodeEditor.tsx";
import { Button } from "./ui/button.tsx";
import { SelectAIComponent } from "./ui/SelectAIComponent.tsx";
import { TabsComponent } from "./ui/TabsComponent.tsx";
import {AIResponseComponent} from "./AIResponseComponent.tsx"





export const CodeInput: FC<CodeInputProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [errorRequest, setErrorRequest] = useState<string>("");
  const [aiID, setAiID] = useState("");
  
  // Props from TabsComponent to CodeEditor

  const [stateComponent, setStateComponent] = useState<string>("javascript");

  const observeInputCode = (value: string) => {
    setInputValue(value);
  };

  const handleClick = async () => {
    if (inputValue.length !== 0) {
      setErrorRequest("");
      setAiResponse("");
      setInputValue("");
      localStorage.setItem("userCode", JSON.stringify(inputValue));
      try {
        const response = await sendRequest(inputValue, aiID);
        const data = await response.json();
        console.log(data);

        if (data.choices && data.choices.length > 0) {
          const responseDataAi = data.choices[0].message.content;
          setAiResponse(responseDataAi);
        } else {
          setErrorRequest("Error server");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        console.error(errorMessage);
        setErrorRequest(errorMessage);
      }
    } else {
      return alert("Заповніть поле");
    }
  };

  return (
    <div className="flex justify-between w-full flex-1 h-full min-h-0">
        <div className="h-full min-h-0 flex flex-col gap-4 pl-20 w-[50%]" >
          <p>Write or insert your code here</p>
          <TabsComponent changeState={setStateComponent} />
          <CodeEditor
            language={stateComponent}
            className=" min-h-[30%] max-h-[50%] border-black border-2 rounded-lg resize-none p-2 dark:border-white overflow-y-auto text-xs "
            onChange={observeInputCode}
            value={inputValue}
          ></CodeEditor>
          <Button
            variant="outline"
            type="button"
            className="border-black border-2 rounded-lg p-4 ml-auto dark:border-white hover:cursor-pointer"
            onClick={handleClick}
          >
            Send
          </Button>
        </div>
      <div className="h-full min-h-0 flex flex-col gap-4 pr-20 w-[40%]">
        <p className="text-center">Response</p>
        <div className="">
          <SelectAIComponent setAiID={setAiID} />
        </div>
       <AIResponseComponent aiResponse={aiResponse} errorRequest={errorRequest} />
      </div>
    </div>
  );
};
