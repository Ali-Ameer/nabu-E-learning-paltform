import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectLanguageData, selectUserLanguage } from "../features/langSlice";
import { selectUserData, selectUserLoggedIn, setLogout } from "../features/userSlice";
import { Spinner } from "./Spinner";
const Button = lazy(() => import("./Button"));

export default function User() {
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const language = useSelector(state => selectLanguageData(state, "navbarUser"))
  const selectedLang = useSelector(selectUserLanguage)
  const userData = useSelector(selectUserData)

  const [openMenu, setOpenMenu] = useState(false)
  const userDropDownRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    const closeDropDown = e => {
      if (userDropDownRef?.current && !userDropDownRef?.current?.contains(e.target)) {
        setOpenMenu(false)
      }
    }
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener('click', closeDropDown);
  }, [])

  return ( isLoggedIn ? 
      <div className="flex item-center relative hover:cursor-pointer">

      <img ref={userDropDownRef} src={userData?.image} alt="user" className="w-10 h-10 rounded-full drop-shadow"
       onClick={() => setOpenMenu(!openMenu)}/>

       {openMenu && <div className={`flex flex-col gap-3 w-40 bg-white dark:bg-neutral-700 drop-shadow-lg rounded-md border border-gray-200 dark:border-0 p-4 absolute top-12 ${selectedLang === "en" ? "right-0" : "left-0" } z-50`}>

        <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-white font-medium hover:underline hover:underline-offset-2 hover:cursor-pointer" onClick={() => navigate("/dashboard/user")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {language.profile}
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-white font-medium hover:underline hover:underline-offset-2 hover:cursor-pointer"
        onClick={() => dispatch(setLogout())}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          {language.logout}

        </p>
       </div>}
       
       </div>
       : 
       <Suspense fallback={<Spinner />}>
        <div className="flex gap-2 item-center">
          <Button title={language.btnLogin} type="secondary" onClick={() => navigate("/login")} />
          <Button title={language.btnSignUp} type="primary" onClick={() => navigate("/signup")} />
        </div>
       </Suspense>
  );
}