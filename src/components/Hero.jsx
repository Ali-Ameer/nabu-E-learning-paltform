import { useMemo } from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';
import { selectLanguageData, selectUserLanguage } from '../features/langSlice';
 
export const Hero = () => {
  const language = useSelector(state => selectLanguageData(state, "hero"))
  const selectedLang = useSelector(selectUserLanguage)

  const title = useMemo(() => ReactHtmlParser(language.title), [language.title]);
  let navigate = useNavigate()
  return (
    <header className='w-full h-fit flex flex-col md:flex-row justify-between items-center gap-6 py-7 px-2 lg:px-28 overflow-hidden'>

        <div className="leftCOl md:w-[50%] md:block z-20">
            <h1 className='text-4xl lg:text-5xl text-gray-700 dark:text-white font-semibold leading-tight lg:leading-normal relative'>
              {title}
              
              </h1>

            <p className='text-base text-gray-600 dark:text-gray-300 font-semibold my-6'>
              {language.subTitle}
            </p>
            <div className="flex gap-4">
            <Button title={language.btn.singUp} type="primary" onClick={() => navigate("/signup")} />
            <button className='border-none bg-transparent font-medium text-sm text-secondary flex items-center gap-2 transition-all transition--duration hover:gap-4'
            onClick={() => navigate("/course")}
            >
              {language.btn.DiscoverCourses}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${selectedLang === "ar" ? "rotate-180" : null} `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </button>
            </div>
        </div>

        <div className="rightCol flex w-full md:w-[50%] h-full flex-col justify-center items-center relative">

          <div className="topCol flex w-full h-[50%] gap-3 mb-3 justify-center items-center md:justify-end md:items-end relative ">

            <div className="leftImg flex justify-center items-center w-[170px] h-[170px] md:w-[200px] md:h-[200px] relative">
              <img 
              src="https://ucarecdn.com/1f5ff32c-37f0-46cb-8aba-2ae7384048d2/-/preview/300x300/-/quality/smart/-/format/auto/" 
              loading='lazy' alt="person" 
              className='w-[170px] h-[170px] md:w-[200px] md:h-[200px] object-cover object-top rounded-[100%] overflow-hidden z-20'/
              >
            <div className={`w-[15px] h-[15px] bg-secondary rounded-full absolute bottom-0 ${selectedLang === "ar" ? "right-0" : "left-0"} z-0`} />
            <div className={`w-[15px] h-[15px] bg-tertiary rounded-full absolute top-[-20px] ${selectedLang === "ar" ? "left-[10px]" : "right-[10px]"} z-0`} />
            </div>

            <div className="rightImg flex justify-center items-center w-[170px] h-[170px] md:w-[200px] md:h-[200px] relative">
              <img src="https://ucarecdn.com/3bb0bdba-6194-4ce1-a6f8-1bed64b7090a/-/preview/300x300/-/quality/smart/-/format/auto/"  loading='lazy' alt="person" className='w-[170px] h-[170px] md:w-[200px] md:h-[200px] object-cover object-top rounded-2xl overflow-hidden z-20'/>
            <div className={`w-[175px] h-[175px] bg-secondary rounded-full absolute top-[-25px] ${selectedLang === "ar" ? "left-[-50px]" : "right-[-50px]"} z-0`} />
            </div>

          </div>

          <div className="bottomCol flex w-full h-[50%] gap-3 justify-center items-center md:justify-end md:items-end">
            <div className="leftImg flex justify-center items-center w-[170px] h-[170px] md:w-[200px] md:h-[200px] relative">
              <img src="https://ucarecdn.com/bb9eba13-9ff5-4340-b119-55c8fd765999/-/preview/300x300/-/quality/smart/-/format/auto/"  loading='lazy' alt="person" className='w-[170px] h-[170px] md:w-[200px] md:h-[200px] object-cover object-top rounded-2xl overflow-hidden z-20'/>
            <div className={`w-[35px] h-[35px] bg-tertiary rounded-full absolute bottom-[0] ${selectedLang === "ar" ? "right-[-50px]" : "left-[-50px]"}  z-0`} />
            </div>

            <div className="rightImg flex justify-center items-center w-[170px] h-[170px] md:w-[200px] md:h-[200px] relative">
              <img src="https://ucarecdn.com/013ce8b8-2ef9-4d93-96c1-769f13afe1c8/-/preview/300x300/-/quality/smart/-/format/auto/"  loading='lazy' alt="person" className={`w-[170px] h-[170px] md:w-[200px] md:h-[200px] object-cover object-top rounded-2xl ${selectedLang === "ar" ? " rounded-l-[50%]" : " rounded-r-[50%]"} overflow-hidden z-20`}/>
              <div className={`w-[15px] h-[15px] bg-primary rounded-full absolute bottom-[0] ${selectedLang === "ar" ? "left-[0]" : "right-[0]"}  z-0`} />
            </div>
          </div>

        </div>

        
    </header>
  )
}
