import React from 'react'
import Button from './Button'
import code_icon from "../assets/icon/code_icon.svg";
import design_icon from "../assets/icon/design_icon.svg";
import marketing_icon from "../assets/icon/marketing_icon.svg";
import security_icon from "../assets/icon/security_icon.svg";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLanguageData } from '../features/langSlice';

export const Category = () => {
  const language = useSelector(state => selectLanguageData(state, "category"))

  return (
    <section className='w-full py-12 px-2 lg:px-28 overflow-hidden' id="category">
        <div className="w-full flex justify-between items-start mb-6">
          <div className='w-[70%] flex flex-col gap-2 md:gap-4'>
            <h1 className="text-lg md:text-4xl font-semibold text-gray-700 dark:text-white">
              {language.title}
            </h1>
            <p className="text-base font-medium text-gray-500 dark:text-gray-200">
            {language.subTitle}
            </p>
          </div>
          <Link to="/course">
            <Button title={language.btn} type="secondary" />
            </Link>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 justify-between">

          <Link to="/course">
          <div className="bg-white dark:bg-neutral-700 drop-shadow-lg rounded-lg p-6 transition-all hover:cursor-pointer hover:drop-shadow flex flex-col items-center justify-center gap-6 border border-gray-100 dark:border-neutral-700">
            <div className='flex items-center justify-center bg-secondary p-4 rounded-full drop-shadow-lg'>
              <img src={code_icon} alt="code_icon" className='w-8 h-8'/>
            </div>
            <h2 className='text-base text-gray-700 dark:text-white font-bold'>
            {language.list.development}
            </h2>
          </div>
          </Link>
          <Link to="/course">
          <div className="bg-white dark:bg-neutral-700 drop-shadow-lg rounded-lg p-6 transition-all hover:cursor-pointer hover:drop-shadow flex flex-col items-center justify-center gap-6 border border-gray-100 dark:border-neutral-700">
            <div className='flex items-center justify-center bg-quaternary p-4 rounded-full drop-shadow-lg'>
              <img src={design_icon} alt="designIcon" className='w-8 h-8' />
            </div>
            <h2 className='text-base text-gray-700 dark:text-white font-bold'>
              {language.list.design}
              </h2>
          </div>
          </Link>
          <Link to="/course">
          <div className="bg-white dark:bg-neutral-700 drop-shadow-lg rounded-lg p-6 transition-all hover:cursor-pointer hover:drop-shadow flex flex-col items-center justify-center gap-6 border border-gray-100 dark:border-neutral-700">
            <div className='flex items-center justify-center bg-quinary p-4 rounded-full drop-shadow-lg'>
              <img src={marketing_icon} alt="marketing_icon" className='w-8 h-8' />
            </div>
            <h2 className='text-base text-gray-700 dark:text-white font-bold'>
            {language.list.marketing}
            </h2>
          </div>
          </Link>
          <Link to="/course">
          <div className="bg-white dark:bg-neutral-700 drop-shadow-lg rounded-lg p-6 transition-all hover:cursor-pointer hover:drop-shadow flex flex-col items-center justify-center gap-6 border border-gray-100 dark:border-neutral-700">
            <div className='flex items-center justify-center bg-tertiary p-4 rounded-full drop-shadow-lg'>
              <img src={security_icon} alt="designIcon" className='w-8 h-8' />
            </div>
            <h2 className='text-base text-gray-700 dark:text-white font-bold'>
            {language.list.security}
            </h2>
          </div>
        </Link>
        </div>
</section>
  )
}