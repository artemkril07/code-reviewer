import { useState, type FC } from "react";
import { type CodeInputProps } from "../types/index.ts";
import { sendRequest } from "../api/apiRequest.ts";
import { CodeEditor } from "./CodeEditor.tsx";
import { Button } from "./ui/button.tsx";
import { SelectAIComponent } from "./ui/SelectAIComponent.tsx";
import { TabsComponent } from "./ui/TabsComponent.tsx";

export const CodeInput: FC<CodeInputProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [errorRequest, setErrorRequest] = useState<string>("");

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
        const response = await sendRequest(inputValue);
        const data = await response.json();
        console.log(data);

        if (data.choices && data.choices.length > 0) {
          const responseDataAi = data.choices[0].message.content;
          setAiResponse(responseDataAi);
          console.log(responseDataAi);
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
    <div className="grid grid-cols-2 mt-10 p-8 gap-10 flex-1">
      <div>
        <div className="grid w-full gap-4">
          <p>Write or insert your code here</p>
          <TabsComponent changeState={setStateComponent} />
          <CodeEditor
            language={stateComponent}
            className="w-full h-70 border-black border-2 rounded-lg resize-none p-2 dark:border-white "
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
      </div>
      <div className="ai-container flex flex-col gap-4 pl-10 pr-10">
        <p className="text-center">Response</p>
        <div className="mr-1">
          <SelectAIComponent />
        </div>
        <textarea
          className=" flex-1 w-full min-h-70 border-black border-2 rounded-lg resize-none p-2 dark:border-white"
          name="aiResponse"
          id="aiResponse"
          placeholder="there will be feedback"
          readOnly
          value={errorRequest.length !== 0 ? errorRequest : aiResponse}
        ></textarea>
      </div>
    </div>
  );
};
