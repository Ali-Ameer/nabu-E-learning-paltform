import { useSelector } from "react-redux";
import { selectLanguageData, selectUserLanguage } from "../features/langSlice";

export const Footer = () => {

  const language = useSelector(state => selectLanguageData(state, "footer"))
  const selectedLang = useSelector(selectUserLanguage)

  return (
    <div className='bg-primary flex flex-col items-center justify-center w-full pt-12 pb-6 mt-12 px-2 lg:px-28'>

        <h1 className="flex flex-col items-center gap-1 text-lg md:text-4xl font-semibold text-tertiary mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        {language.logo}</h1> 
       
        <p className="w-full lg:w-[50%] text-center text-base font-medium text-gray-300 mb-4">
          {language.subTitle}
        </p>

        <ul className="flex gap-4 lg:gap-6">
          <li className={`text-base text-white font-medium hover:text-gray-200 transition-all hover:cursor-pointer after:content-['|'] ${selectedLang === "ar" ? "after:mr-6" : "after:ml-6" } `}>
          {language.list.home}
          </li>
          <li className={`text-base text-white font-medium hover:text-gray-200 transition-all hover:cursor-pointer after:content-['|'] ${selectedLang === "ar" ? "after:mr-6" : "after:ml-6" } `}>
          {language.list.courses}
          </li>
          <li className={`text-base text-white font-medium hover:text-gray-200 transition-all hover:cursor-pointer after:content-['|'] ${selectedLang === "ar" ? "after:mr-6" : "after:ml-6" }`}>
            <a href="/#about">
            {language.list.about}
            </a>
          </li>
          <li className="text-base text-white font-medium hover:text-gray-200 transition-all hover:cursor-pointer">
          {language.list.contact}
          </li>
        </ul>

        <p className="text-center text-base font-medium text-white mt-6">
        {language.copyRight}
        </p>
    </div>
  )
}
