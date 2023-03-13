import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { selectLanguageData } from "../features/langSlice";
import { selectUserCourse, setLogout } from "../features/userSlice";

export default function Dashboard() {
  const dispatch = useDispatch()
  const language = useSelector(state => selectLanguageData(state, "dashboard"))
  const courses = useSelector(selectUserCourse)?.length

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-4 px-2 lg:px-28 mt-6">

      <div className="w-full md:w-[30%] h-[150px] md:h-[calc(100vh-90px)] flex flex-col relative p-2 md:py-0 bg-white border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 rounded-md drop-shadow-lg overflow-hidden">
          <div className="flex items-center justify-start mt-0 md:mt-10">
            <span className="text-gray-600 dark:text-gray-300 text-2xl font-bold">
              {language.title}
            </span>
          </div>

          <nav className="mt-2 md:mt-10">
            <NavLink className={({ isActive }) =>
              isActive ? "block bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-white rounded-lg" : undefined
            }
             to="/dashboard/user"
            >
            <h1 className="text-lg font-normal text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 flex gap-4 items-center p-2 md:my-6 my-1 transition-colors duration-200 rounded-lg hover:cursor-pointer">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
              </svg>
              {language.account}
            </h1>
            </NavLink>

            <NavLink className={({ isActive }) =>
              isActive ? "block bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-white rounded-lg" : undefined
            }
             to="/dashboard/course"
            >
            <h1 className="text-lg font-normal text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 flex justify-between items-center gap-4 p-2 md:my-6 my-1 transition-colors duration-200 rounded-lg hover:cursor-pointer">
              <span className="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <line x1="8" y1="4" x2="8" y2="20" />
                  <line x1="16" y1="4" x2="16" y2="20" />
                  <line x1="4" y1="8" x2="8" y2="8" />
                  <line x1="4" y1="16" x2="8" y2="16" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="16" y1="8" x2="20" y2="8" />
                  <line x1="16" y1="16" x2="20" y2="16" />
                </svg>
                {language.myCourses}
              </span>

              <span className="text-right">
                  <span className="p-1 w-6 h-6 text-sm inline-block text-center rounded-full text-white bg-red-500">
                    {courses}
                  </span>
              </span>
              </h1>
            </NavLink>
          </nav>

          <div className="hidden md:block absolute bottom-0 my-4">
            <h2 className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 cursor-pointer"
              onClick={() => dispatch(setLogout())}
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
              <span className="mx-4 font-medium">{language.logout}</span>
            </h2>
          </div>
      </div>

        <Outlet />

    </div>
  );
};
