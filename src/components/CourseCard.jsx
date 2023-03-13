import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserCourseById } from '../features/userSlice';
import { selectLanguageData } from '../features/langSlice';
import Button from './Button';

export const CourseCard = ({img, title, category, rating, id}) => {
  const language = useSelector(state => selectLanguageData(state, "courseCard"))
  const findCourse = useSelector(state => selectUserCourseById(state, id))
  
  const handleRating = useCallback ( () => {
    rating > 5 ? rating = 5 : rating = rating;
    const rat = [];
    if (rating <= 1 || rating === null || rating === undefined) {
      rat.push( <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#eab308"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#eab308"
        className="w-4 h-4 md:w-5 md:h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      )
    }
    for (let i = 0; i < rating; i++) {     
        rat.push(  
        <svg key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="#eab308"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#eab308"
          className="w-4 h-4 md:w-5 md:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg> 
        )
    }

    return rat;
  })

  return (
    <Link to={findCourse ? "/dashboard/course/"+ id : `/course/details/${id}`}>
        <div className="flex flex-col h-fit rounded-lg overflow-hidden bg-white dark:bg-neutral-700 drop-shadow-md relative">
          <p className="block md:hidden absolute top-1 left-2 text-xs text-white font-medium p-1 px-2 rounded-lg bg-[#3C79F5] bg-opacity-90">
                {category}
              </p>
          <img src={img} alt="course" className="w-full h-[158px] object-cover" />

          <div className="flex flex-col p-2 flex-1">
            
            <div className="flex gap-1 items-center justify-center md:justify-between">
              <div className="flex gap-1 items-center ">
                {handleRating()}
              </div>
              <p className="hidden md:block text-xs text-white font-medium p-1 px-2 rounded-lg bg-[#3C79F5]">
                {category}
              </p>
            </div>

            <div className="flex flex-col justify-between w-full flex-1">
              <h1 className="min-h-[48px] lg:min-h-[56px] text-base lg:text-lg text-gray-700 dark:text-white font-medium my-2">
              {title.length > 50 ? title?.slice(0, 50)+".." : title}
              </h1>
              <Button 
              title={findCourse ? language.btnContinue : language.btnEnroll} icon={
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
    </Link>
  )
}