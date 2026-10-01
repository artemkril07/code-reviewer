import { useState, type FC, useEffect } from "react";
import { type CodeInputProps } from "../types/index.ts";
import { sendRequest } from "../api/apiRequest.ts";
import { CodeEditor } from "./CodeEditor.tsx";
import { Button } from "./ui/button.tsx";
import { Spinner } from "./ui/spinner.tsx";
import { SelectAIComponent } from "./ui/SelectAIComponent.tsx";
import { TabsComponent } from "./ui/TabsComponent.tsx";
import { AIResponseComponent } from "./AIResponseComponent.tsx";
import { PROMPTS_AI } from "@/constants/prompts.ts";

export const CodeInput: FC<CodeInputProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [errorRequest, setErrorRequest] = useState<string>("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // Props from TabsComponent to CodeEditor
  const [stateComponent, setStateComponent] = useState<string>("javascript");

  const observeInputCode = (value: string) => {
    setInputValue(value);
  };

  
  useEffect(() => {
    if (aiResponse.length > 0) {
      setLoading(false);
    }
  }, [aiResponse]);
  
  const handleClick = async () => {
    if (loading) return; // Запобігає подвійному кліку
    
    if (inputValue.length !== 0) {
      setErrorRequest("");
      setAiResponse("");
      setInputValue("");
      setLoading(true);
      localStorage.setItem("userCode", JSON.stringify(inputValue));
      const selectedObj = PROMPTS_AI.find((item) => item.label === label);
      const prompt = selectedObj?.prompt || "";
      try {
        const response = await sendRequest(inputValue, prompt);
        const data = await response.json();
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
      return alert("Write down your code and select the type of response");
    }
  };
  return (
    <div className="flex justify-between w-full flex-1 h-full min-h-0">
      <div className="h-full min-h-0 flex flex-col gap-4 pl-20 w-[50%]">
        <p>Write or insert your code here</p>
        <TabsComponent changeState={setStateComponent} />
        <CodeEditor
          language={stateComponent}
          className=" min-h-[30%] max-h-[50%] border-black border-2 rounded-lg resize-none p-2 dark:border-white overflow-y-auto text-xs "
          onChange={observeInputCode}
          value={inputValue}
        ></CodeEditor>
        {loading ? (
          <Button
            variant="outline"
            type="button"
            disabled
            className="border-black border-2 rounded-lg p-4 ml-auto dark:border-white hover:cursor-pointer"
          >
            <Spinner data-icon="inline-start" />
            Loading...
          </Button>
        ) : (
          <Button
            variant="outline"
            type="button"
            className="border-black border-2 rounded-lg p-4 ml-auto dark:border-white hover:cursor-pointer"
            onClick={handleClick}
          >
            Send
          </Button>
        )}
      </div>
      <div className="h-full min-h-0 flex flex-col gap-4 pr-20 w-[40%]">
        <p className="text-center">Response</p>
        <SelectAIComponent selectAILabel={setLabel} value={label} />
        <AIResponseComponent
          aiResponse={aiResponse}
          errorRequest={errorRequest}
        />
      </div>
    </div>
  );
};
