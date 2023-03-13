import { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLanguageData, selectUserLanguage } from "../features/langSlice";
import { DarkMode } from "./DarkMode";
import { Language } from "./Language";
import { Spinner } from "./Spinner";
const User = lazy(() => import("./User"));

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const language = useSelector(state => selectLanguageData(state, "navbar"))
  const selectedLang = useSelector(selectUserLanguage)

  return (
    <div className="navbar flex w-full h-[58px] py-2 items-center justify-between px-2 lg:px-28 relative">
      <div className="flex flex-2 lg:flex-1 justify-start items-center gap-2">

      <div className="block md:hidden ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:hidden"
            >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              >
              {isOpen ? (
                <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.828-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.828 4.828 4.828z" />
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                  )}
            </svg>
          </button>

          {isOpen &&
          <div className={`flex flex-col gap-4 w-[80%] h-screen fixed p-2 top-0 ${selectedLang === "ar" ? "right-0" : "left-0"} z-30 bg-white dark:bg-neutral-700 drop-shadow-2xl`}>

            <button className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 mt-2 mb-4"
            onClick={() => setIsOpen(!isOpen)}
            >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.828-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.828 4.828 4.828z" />
            </svg>
           </button>

          <div className="flex flex-col justify-start items-start gap-4 mb-4">
            <Language />
            <DarkMode />
          </div>

        <ul className="flex flex-col gap-4 ">
          <li className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          <Link to='/'>
            {language.list.home}
            </Link>
          </li>
          <li className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
            <Link to='/course'>
              {language.list.courses}
            </Link>
          </li>
          <li className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
            <Link to='/#about'>
            {language.list.about}
            </Link>
          </li>
          <li className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          >
            <Link to='/contact'>
          {language.list.contact}
            </Link>
          </li>
          </ul>
        </div>
}
        </div>

        <h3 className="flex items-center gap-1 text-lg text-primary font-bold hover:cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
          {language.logo}
        </h3>
      </div>
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-4">
          <li className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer">
            <Link to='/'>
          {language.list.home}
            </Link>
          </li>
          <li className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer">
            <Link to='/course'>
          {language.list.courses}
            </Link>
          </li>
          <li className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer">
            <Link to='/#about'>
            {language.list.about}
            </Link>
          </li>
          <li className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer">
            <Link to='/contact'>
          {language.list.contact}
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-2 lg:flex-1 gap-2 justify-end items-center">
        <div className="hidden md:flex gap-2">
        <Language />
        <DarkMode />
        </div>
        <Suspense fallback={<Spinner />}>
          <User />
        </Suspense>
      </div>
    </div>
  );
};
