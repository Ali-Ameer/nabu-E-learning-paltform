import { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from '../components/Button';
import { SkeletonCard } from "../components/Skeleton/SkeletonCard";
import { SkeletonImgText } from "../components/Skeleton/SkeletonImgText";
import { SkeletonTitle } from "../components/Skeleton/SkeletonTitle";
import { selectLanguageData } from "../features/langSlice";
import { selectUserCourse, selectUserCourseById, selectUserData, selectUserLoggedIn, setUser } from "../features/userSlice";
import { useGetCourseInfoQuery } from "../services/courseApi";
import { useUpdateUserAddCourseMutation } from "../services/UserApi";

function CourseDetails() {
    let { id } = useParams()
    let navigate = useNavigate()
    const dispatch = useDispatch()
    let { data, isLoading, isError } = useGetCourseInfoQuery(id);
    let [updateUserAddCourse, { isLoading: Loading} ] = useUpdateUserAddCourseMutation();
    
    const isLoggedIn = useSelector(selectUserLoggedIn)
    const language = useSelector(state => selectLanguageData(state, "courseDetails"))
    const userData = useSelector(selectUserData)
    const findCourse = useSelector(state => selectUserCourseById(state, id))
    
    const addCourseToUserCourses = () => {
      if (!isLoggedIn) {
        return navigate("/login")
      }
      
      if (!findCourse) {
        updateUserAddCourse({id: userData._id, courseId: id}).unwrap()
        .then((result) => {
              const {courses: oldCourse, ...data} = userData
             dispatch(setUser({data: {courses: result.courses, ...data}, loggedIn: true}))
             navigate("/dashboard/course/" + id) 
            })
          .catch((err) => { console.log(err) });
        } else {
          navigate("/dashboard/course/" + id)
      }
    }
        if (isError) {
          return (
            <article className="flex flex-col md:flex-row gap-6 lg:gap-16 py-6 px-2 lg:px-28">
              <p className="w-full text-lg font-medium text-gray-700 dark:text-white text-center my-16">
                {language.err}
              </p>
            </article>
          );
        } else if (isLoading) {
          return (
            <article className="flex flex-col md:flex-row gap-6 lg:gap-16 py-6 px-2 lg:px-28">
              <div className="w-full md:w-[70%] md:pr-4">
                <SkeletonTitle />

                <SkeletonImgText />
              </div>
              
              <div className="w-full md:w-[30%] flex flex-col gap-8">
                <SkeletonCard />
                <SkeletonCard image="true"/>
              </div>
            </article>
          );
        } else {
          return (
            <article className="flex flex-col md:flex-row gap-6 lg:gap-16 py-6 px-2 lg:px-28">
              <div className="w-full md:w-[70%] md:pr-4">
                <h1 className="text-xl md:text-4xl font-bold text-gray-700 dark:text-white mb-4">
                  {data?.title}
                </h1>

                <img
                  src={data?.image}
                  alt="course"
                  className="w-full h-[300px] md:h-[400px] rounded-md object-cover object-center overflow-hidden mb-2"
                />
                <div className="flex gap-2 justify-between mb-4 text-gray-600 dark:text-white">
                  <div className="flex md:flex-1 gap-2 items-center ">
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
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                    <p className="text-base font-medium text-gray-600 dark:text-white">
                      {" "}
                      {language.topic} {data?.category}
                    </p>
                  </div>

                  <div className="flex md:flex-1 justify-center gap-2 items-center">
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
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    <p className="text-base font-medium text-gray-600 dark:text-white">
                      {" "}
                      {language.lesson} {data?.video?.length}
                    </p>
                  </div>

                  <div className="flex md:flex-1 gap-2 justify-end items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#eab308"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#eab308"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <p className="text-base font-medium text-gray-600 dark:text-white">
                      {data?.rating}
                    </p>
                  </div>
                </div>

                <p className="text-base font-medium text-gray-600 dark:text-gray-200">
                  {data?.description}
                </p>
              </div>

              <div className="w-full md:w-[30%] flex flex-col gap-8">
                <div className="w-full flex flex-col gap-4 px-4 py-6 bg-white dark:bg-neutral-700 drop-shadow-md rounded-md">
                  <p className="flex items-start gap-2 text-base font-medium text-gray-600 dark:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8338ec"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                    {language.card1.first}
                  </p>

                  <p className="flex items-start gap-2 text-base font-medium text-gray-600 dark:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8338ec"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {language.card1.second}
                  </p>

                  <p className="flex items-start gap-2 text-base font-medium text-gray-600 dark:text-white pb-4 border-b border-b-gray-200 border-dashed">
                    <svg
                      fill="none"
                      height="20"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.0006 9.9997C20.2101 9.9997 22.0013 11.7909 22.0013 14.0003C22.0013 15.0154 21.6232 15.9422 21.0003 16.6475L21.0002 21.2484C21.0002 21.8192 20.3957 22.1678 19.9101 21.9173L19.8206 21.8632L18.0003 20.5909L16.1806 21.8632C15.7127 22.1901 15.0807 21.8943 15.008 21.3527L15.0011 21.2484L15.0001 16.6465C14.3777 15.9413 14 15.0149 14 14.0003C14 11.7909 15.7911 9.9997 18.0006 9.9997ZM19.4994 17.7108C19.0365 17.8979 18.5306 18.001 18.0006 18.001C17.4699 18.001 16.9633 17.8976 16.4999 17.71L16.5003 19.8089L17.5711 19.0618C17.7968 18.9041 18.0878 18.8844 18.3298 19.0027L18.4302 19.0618L19.4993 19.8089L19.4994 17.7108ZM19.25 3.00391C20.7125 3.00391 21.9084 4.14561 21.995 5.58638L22 5.75391L22.0014 10.9998C21.5971 10.4616 21.0867 10.0076 20.5013 9.66887L20.5 5.75391C20.5 5.1067 20.0081 4.57437 19.3778 4.51036L19.25 4.50391H4.75C4.10279 4.50391 3.57047 4.99578 3.50645 5.6261L3.5 5.75391V15.2539C3.5 15.9011 3.99187 16.4334 4.62219 16.4975L4.75 16.5039L13.6716 16.5051L13.7955 16.7076L13.9291 16.9043L14 16.9977L13.999 18.0039H4.75C3.28747 18.0039 2.0916 16.8622 2.00502 15.4214L2 15.2539V5.75391C2 4.29137 3.1417 3.0955 4.58248 3.00892L4.75 3.00391H19.25ZM18.0006 11.4997C16.6196 11.4997 15.5 12.6193 15.5 14.0003C15.5 15.3814 16.6196 16.501 18.0006 16.501C19.3817 16.501 20.5013 15.3814 20.5013 14.0003C20.5013 12.6193 19.3817 11.4997 18.0006 11.4997ZM11.25 12.4997C11.6642 12.4997 12 12.8355 12 13.2497C12 13.6294 11.7178 13.9432 11.3518 13.9929L11.25 13.9997H6.75C6.33579 13.9997 6 13.6639 6 13.2497C6 12.87 6.28215 12.5562 6.64823 12.5065L6.75 12.4997H11.25ZM17.25 6.9997C17.6642 6.9997 18 7.33549 18 7.7497C18 8.1294 17.7178 8.44319 17.3518 8.49286L17.25 8.4997H6.75C6.33579 8.4997 6 8.16392 6 7.7497C6 7.37001 6.28215 7.05621 6.64823 7.00655L6.75 6.9997H17.25Z"
                        fill="#8338ec"
                      />
                    </svg>
                    {language.card1.third}
                  </p>

                  <h2 className="text-lg font-medium text-[#8338ec]">
                    {language.card1.price}
                  </h2>
                  <Button
                    title={
                      findCourse
                        ? language.card1.btnContinueLearning
                        : Loading
                        ? language.loading
                        : language.card1.btnJoinNow
                    }
                    type="primary"
                    onClick={addCourseToUserCourses}
                  />
                </div>

                <div className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-neutral-700 drop-shadow-md rounded-md">
                  <img
                    src={data?.teacher?.image}
                    alt="teacher"
                    className="w-20 h-20 rounded-full object-contain object-center overflow-hidden mb-2"
                  />
                  <p className="text-lg font-medium text-gray-700 dark:text-white">
                    {data?.teacher.name}
                  </p>
                  <p className="text-base font-medium text-gray-600 dark:text-white">
                    {data?.teacher.role === "teacher"
                      ? language.card2.teacher
                      : data?.teacher.role}
                  </p>
                </div>
              </div>
            </article>
          );
        }
}

export default CourseDetails