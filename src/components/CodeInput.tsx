import { useState, type FC } from "react";
import { type CodeInputProps } from "../types/index.ts";
import { sendRequest } from "../api/apiRequest.ts";

export const CodeInput: FC<CodeInputProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [errorRequest, setErrorRequest] = useState<string>("")


  // type of event as typescript
  const controlCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = async () => {
    setAiResponse("")
    localStorage.setItem("userCode", JSON.stringify(inputValue));
    try {
      const response = await sendRequest(inputValue);
      const data = await response.json();
      console.log(data);
      
      if (data.choices && data.choices.length > 0){
        const responseDataAi = data.choices[0].message.content
        setAiResponse(responseDataAi);
        console.log(responseDataAi);
      }else{
        setErrorRequest('Error server');
        
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      console.error(errorMessage);
      setErrorRequest(errorMessage );

      // type of error because typescript initialize it as "unknown"
    }
  };

  return (
    <div>
      <div className="">
        <h1 className="text-default uppercase text-center mt-10">Code Reviewer</h1>
        <h6 className="text-center">by dr.Cactus</h6>
      </div>
      <div className=" grid  grid-cols-3 justify-center mt-20 p-8 gap-20">
        <div className="code-container flex-container col-span-2 ml-auto">
          <div className="grid grid-cols-1 w-fit gap-4">
            <p>Check your code and refactor it with AI-assistant</p>
            <textarea
              className="w-full h-70 border-black border-4 rounded-lg resize-none p-2"
              name="codeReviwer"
              id="codeReviwer"
              placeholder="insert your code (max 500 symbols)"
              maxLength={500}
              onChange={controlCode}
              value={inputValue}
            ></textarea>
            <button
              type="button"
              className="border-black border-4 rounded-lg p-2 ml-auto"
              onClick={handleClick}
            >
              Send
            </button>
          </div>
        </div>
        <div className="ai-container flex flex-col gap-4">
          <p className="text-center">Feedback of AI assistant</p>
          <textarea
            className="w-full h-70 border-black border-4 rounded-lg resize-none p-2"
            name="aiResponse"
            id="aiResponse"
            placeholder="there will be feedback"
            readOnly
            value={ errorRequest.length !== 0 ? errorRequest : aiResponse}
          ></textarea>
        </div>
      </div>
    </div>
  );
};



