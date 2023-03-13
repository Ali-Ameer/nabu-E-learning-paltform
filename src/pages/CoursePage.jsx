import { lazy, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { SkeletonList } from '../components/Skeleton/SkeletonList';
import { SkeletonVideo } from '../components/Skeleton/SkeletonVideo';
import { selectLanguageData } from '../features/langSlice';
import { useGetCourseByIdQuery } from '../services/courseApi';

export default function CoursePage() {
    let { id } = useParams()
    const { data, error, isLoading, isError } = useGetCourseByIdQuery(id);
    const language = useSelector(state => selectLanguageData(state, "coursePage"))

    const [videoLink, setVideoLink] = useState();
    const [activeVideo, setActiveVideo] = useState(0);

  
    if (isError) {
      return (
        <article className="w-full px-2 lg:px-28 py-6">
          <p className="w-full text-lg font-medium text-gray-700 dark:text-white text-center my-16">
            {language.err}
          </p>
        </article>
      );
    } else if (isLoading) {
      return (
        <article className="w-full h-[calc(100vh-60px)] px-2 lg:px-28 py-6">
        <div className="flex flex-col-reverse md:flex-row w-full gap-4 relative">
          <div className="w-full md:w-[25%] h-full sticky top-0 left-0 overflow-hidden">
          <SkeletonList />
          </div>
    
          <div className="w-full md:w-[75%] h-64 md:h-[400px] lg:h-[450px]">
          <SkeletonVideo />
    
          <div className="flex items-center justify-between gap-4 pt-4">
          </div>
    
          </div>
        </div>
        </article>
      )
    } else {
      return (
        <article className="w-full px-2 lg:px-28 py-6">
    
        {isLoading && <h2>Loading...</h2>}
        {error && <h2>something went wrong please try again !</h2>}
    
        <div className="flex flex-col-reverse md:flex-row w-full gap-4 relative">
          <div className="w-full md:w-[25%] h-full sticky top-0 left-0 bg-white border border-gray-200 dark:border-0 rounded-md drop-shadow-md dark:bg-neutral-700 overflow-hidden">
          { data?.video?.map((item , index) =>
            <h2 key={item._id} onClick={() =>{ setVideoLink(item.link), setActiveVideo(index)} }
              className={`flex items-center justify-between text-base font-medium py-3 px-4 text-gray-600 dark:text-white transition-all hover:cursor-pointer ${activeVideo === index ? "bg-primary text-white" : "hover:text-gray-700 dark:hover:text-gray-300"} `}
            >
              {item.title} <p>{">"}</p>
            </h2>
            ) }
          </div>
    
          <div className="w-full md:w-[75%] h-full">
          <video width="100%" height="450" autoPlay controls 
          src={!videoLink ? data?.video[0]?.link : videoLink }
          className="drop-shadow-lg"
          />
    
          <div className="flex items-center justify-between gap-4 pt-4">
            <Button title={"< " + language.previous} 
            onClick={() => 
            {
              0 === activeVideo ? null : setActiveVideo(activeVideo-1), 
              0 === activeVideo ? null : setVideoLink(data?.video[activeVideo-1]?.link)
            }
          }
            />
    
            <Button title={language.next + "  >"} type="primary" 
            onClick={() => 
              { 
                data?.video.length -1 === activeVideo ? null : setActiveVideo(activeVideo + 1 ),
                data?.video.length -1 === activeVideo ? null : setVideoLink(data?.video[activeVideo+1]?.link)
              }
            }
            />
    
          </div>
    
          </div>
        </div>
        
      </article>
      )
    }
}
