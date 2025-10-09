import Link from "next/link";
import ThemeMode from "./ThemeMode";

function Header() {
  return (
    <header className="min-h-[10vh] py-4 px-2 md:px-7 w-auto bg-base-300 flex flex-col md:flex md:flex-row justify-center items-center">
      <Link href="/" className="text-3xl font-bold md:w-[50%] my-2">
        Smart Diet Planner
      </Link>
      <div className="flex flex-row justify-center items-center md:ml-auto gap-7 font-bold my-2">
        <ThemeMode />
      </div>
    </header>
  );
}

export default Header;
