import { useEffect, useState, type FC } from "react";
import { Button } from "../components/ui/button";

export const ButtonThemeToggle: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          type="button"
          className=" mr-10 p-2 hover: cursor-pointer"
          onClick={toggleTheme}
        >
          Change theme
        </Button>
      </div>
    </>
  );
};
export default ButtonThemeToggle;
