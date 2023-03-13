import Button from './Button'
import { useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom'
import { selectUserLoggedIn } from '../features/userSlice';
import { selectLanguageData, selectUserLanguage } from '../features/langSlice';
import { useMemo } from 'react';

export default function About() {
    let navigate = useNavigate()
    const language = useSelector(state => selectLanguageData(state, "about"))
    const selectedLang = useSelector(selectUserLanguage)
    const isLoggedIn = useSelector(selectUserLoggedIn)
    const subTitle = useMemo(() => ReactHtmlParser(language.subTitle), [language.subTitle]);
  return (
    <section className='block md:flex w-full gap-6 py-12 px-2 lg:px-28 overflow-hidden' id="about">
        <div className="w-full md:w-[50%]">
            <div className="w-full h-[358px] md:h-[458px] flex gap-2">
                <div className="w-[50%] h-full grid grid-rows-2 gap-2 relative">
                    <img src="https://ucarecdn.com/013ce8b8-2ef9-4d93-96c1-769f13afe1c8/-/scale_crop/270x225/top"  loading='lazy' alt="person" className='w-full h-full object-cover object-top rounded-2xl relative  overflow-hidden z-20'/>
                    <img src="https://ucarecdn.com/bb9eba13-9ff5-4340-b119-55c8fd765999/-/scale_crop/270x225/top"  loading='lazy' alt="person" className='w-full h-full object-cover object-top rounded-lg z-20 rounded-t-[50%] relative'/>

                    <div className={`w-[30px] h-[30px] bg-tertiary rounded-full absolute top-[-40px] ${selectedLang === "ar" ? "left-[-19px]" : "right-[-19px]"} z-0`} />
                    <div className={`w-[30px] h-[30px] bg-secondary rounded-full absolute top-[calc(50%+4px)] ${selectedLang === "ar" ? "right-[0px]" : "left-[0px]"} z-0`} />
                </div>
                <div className="w-[50%] h-full flex gap-2 relative">
                    <img src="https://ucarecdn.com/c254aa12-6c0f-4f7f-b398-87ff95568f65/-/scale_crop/270x460/top/"  loading='lazy' alt="person" className='w-full h-full object-cover object-top rounded-lg overflow-hidden z-20 relative'/>
                    <div className={`w-[150px] h-[150px] bg-secondary rounded-full absolute top-[-30px] ${selectedLang === "ar" ? "left-[-25px]" : "right-[-25px]"} z-0`} />
                </div>
            </div>
        </div>
        <div className="w-full md:w-[50%] p-4 relative">
            <h1 className="text-2xl md:text-5xl font-semibold text-gray-700 dark:text-white mb-2 md:mb-6">
                {language.title}
            </h1>
            <p className="text-base font-medium text-gray-500 dark:text-gray-400 mb-4">
              {subTitle}
            </p>
            <ul className='pl-8 list-disc mb-4'>
            {language?.list?.map((l , index) => 
                <li key={index} className='text-gray-600 dark:text-gray-200 text-base font-bold mb-2'>
                {l.title}
                </li>
                )}
                </ul>
            <Button title={isLoggedIn ? language.btnExploreCourses : language.btnSignUp} type="primary" onClick={() => navigate(isLoggedIn ? "course" : "/signup")}/>
        </div>
    </section>
  )
}
