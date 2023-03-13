import React from 'react'
import { useSelector } from "react-redux";
import { selectLanguageData, selectUserLanguage } from '../features/langSlice';
import Carousel from "./Carousel"

export const PopularCourse = () => {
  const language = useSelector(state => selectLanguageData(state, "popularCourse"))
  const selectedLang = useSelector(selectUserLanguage)

  return (
    <div className='w-full py-12 px-2 lg:px-28'>
        <div className="flex justify-between items-center mb-4">
        <h1 className='text-lg md:text-2xl text-primary font-bold'>
          {language.title}
        </h1>
        <p className='text-base text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2 hover:cursor-pointer'>
        {language.btn}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${selectedLang === "ar" ? "rotate-180" : null} `}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </p>
        </div>
        
        <Carousel />
    </div>
  )
}