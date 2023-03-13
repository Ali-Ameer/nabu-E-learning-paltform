import React from 'react'
import { useSelector } from 'react-redux';
import { selectLanguageData } from '../features/langSlice';
import Button from './Button'

export const NewsLetter = () => {
  const language = useSelector(state => selectLanguageData(state, "newsLetter"))

  return (
    <div className="flex flex-col gap-6 items-center justify-center py-12 px-2 lg:px-28">
        <div className="flex flex-col items-center justify-center gap-1 md:gap-2" >
            <h1 className="text-lg md:text-4xl font-semibold text-gray-700 dark:text-white">
              {language.title}
            </h1>
            <p className="w-full lg:w-[80%] text-base text-center font-medium text-gray-500 dark:text-gray-300"> {language.subTitle}
            </p>
        </div>

        <div className="w-full flex items-center justify-center gap-2">
            <input type="email" name="email" placeholder={language.inputPlaceHolder} 
            className='w-full lg:w-80 h-fit bg-gray-200 dark:bg-neutral-700 p-3 border border-gray-300 dark:border-neutral-600 text-sm text-gray-600 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary rounded-md'/>
            <Button title={language.subscribe} customClass="py-3"/>
        </div>
        
    </div>
  )
}
