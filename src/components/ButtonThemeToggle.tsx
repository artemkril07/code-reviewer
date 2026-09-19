import { useEffect, useState, type FC } from "react";

export const ThemeToggle: FC = () => {
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
        <button
          type="button"
          className="themeToggle border-2 rounded-full mr-10 text-xs w-25 p-2"
          onClick={toggleTheme}
        >
          Change theme
        </button>
      </div>
    </>
  );
};

export default ThemeToggle;
