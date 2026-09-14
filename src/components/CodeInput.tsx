import {  useState, type FC } from "react";
import { type CodeInputProps } from "../types/index.ts";

export const CodeInput: FC<CodeInputProps> = () => {

  const [inputValue, setInputValue] = useState <string>("");

  const controleCode = (e) =>{
    setInputValue(e.target.value);
    console.log(e.target.value);
  }
  const saveCode=()=>{
    localStorage.setItem('userCode', JSON.stringify(inputValue));
  }

  return (
    <div>
      <div className="flex-container mt-20 p-8">
        <h1 className="text-default uppercase">Code Reviewer</h1>
        <h6 className="pl-30">by dr.Cactus</h6>
        <div className="flex flex-col w-fit gap-4 mt-20">
          <textarea
            className="w-full h-70 border-black border-4 rounded-lg"
            name="codeReviwer"
            id="codeReviwer"
            placeholder="insert your code (max 500 symbols)"
            maxLength={500}
            onChange={controleCode}
            value={inputValue}>
          </textarea>
          <button type="button" className="border-black border-4 rounded-lg p-2 ml-auto" onClick={saveCode} >Send</button>
          <p>Check your code and refactore it with AI-assistant</p>
        </div>
      </div>
    </div>
  );
};
