import Link from "next/link";
import ThemeMode from "./ThemeMode";

function Header() {
  return (
    <header className="min-h-[10vh] py-4 px-2 md:px-7 w-auto bg-base-300 flex flex-row justify-center items-center">
      <Link href="/" className="text-3xl font-bold w-[80%] my-2 me-auto">
        Smart Diet Planner
      </Link>
      <div className="flex flex-row justify-center items-center w-[10%] ml-auto font-bold my-2">
        <ThemeMode />
      </div>
    </header>
  );
}

export default Header;
