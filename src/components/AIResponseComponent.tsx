interface AIResponseProps {
  errorRequest: string;
  aiResponse: string;
  className?: string;
}

export const AIResponseComponent = ({
  errorRequest,
  aiResponse,
}: AIResponseProps) => {



  
  return (
    <>
      <textarea
        className="w-full overflow-y-auto min-h-[50%] border-black border-2 rounded-lg resize-none dark:border-white pl-4 pt-2 text-xl"
        name="aiResponse"
        id="aiResponse"
        placeholder="there will be feedback"
        readOnly
        value={errorRequest.length !== 0 ? errorRequest : aiResponse}
      ></textarea>
    </>
  );
};
