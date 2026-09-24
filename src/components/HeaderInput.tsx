import { ButtonThemeToggle } from "./ButtonThemeToggle";

export const HeaderInput = () => {
  return (
    <div>
      <div className="mt-10 flex justify-between">
        <div>
          <a href="#">
            <img
              width={100}
              height={100}
              src="src/assets/images/CR_logo.webp"
              alt="logo"
              className="ml-8 rounded-full"
            />
          </a>
        </div>
        <div>
          <h1 className="text-default uppercase text-center">Code Reviewer</h1>
          <h6 className="text-center">by dr.Cactus</h6>
        </div>
        <ButtonThemeToggle />
      </div>
    </div>
  );
};
