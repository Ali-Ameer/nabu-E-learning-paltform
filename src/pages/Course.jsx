import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { SkeletonCourseCard } from "../components/Skeleton/SkeletonCourseCard";
import { SkeletonList } from "../components/Skeleton/SkeletonList";
import { SkeletonTitle } from "../components/Skeleton/SkeletonTitle";
import { selectLanguageData, selectUserLanguage } from "../features/langSlice";
import { useGetAllCourseQuery } from "../services/courseApi";

export default function Course() {
  const language = useSelector(state => selectLanguageData(state, "courseAndCategories"))
  const selectedLang = useSelector(state => selectUserLanguage(state))

  let { data, isLoading, isError } = useGetAllCourseQuery();
  const [categoryId, setCategoryId] = useState(0);
  const [courses, setCourses] = useState(data);
  const [openCategory, setOpenCategory] = useState(false);

  console.log(data);
  const categoryData = [
    { name: language.categories.webDevelopment, value: "Web development", id: 1 },
    { name: language.categories.programming, value: "Programming", id: 2 },
    { name: language.categories.design, value: "Design", id: 3 },
    { name: language.categories.marketing, value: "Marketing", id: 4 },
    { name: language.categories.cybersecurity, value: "Cybersecurity", id: 5 },
    { name: language.categories.ai, value: "Artificial Intelligence", id: 6 },
    { name: language.categories.blockchainTechnology, value: "Blockchain Technology", id: 7,},
    { name: language.categories.networking, value: "Networking", id: 8 },
    { name: language.categories.videoEditing, value: "video editing", id: 9 },
    { name: language.categories.photography, value: "Photography", id: 10 },
    { name: language.categories.languages, value: "Languages", id: 11 },
  ];

  const handleSearch = (value) => {

    setCourses(
      data?.filter(
        (c) =>
          c.title.toLowerCase().includes(value.toLowerCase()) ||
          c.category.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const handleSort = (value) => {
    let CourseData = courses ? courses : [...data];
    if (value === "newest") {
      const sortedData = [...CourseData].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setCourses(sortedData);
    } else if (value === "oldest") {
      const sortedData = [...CourseData].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      setCourses(sortedData);
    } else if (value === "topRating") {
      const sortedData = [...CourseData].sort((a, b) => {
        const dateA = a.rating;
        const dateB = b.rating;
        return dateB - dateA;
      });
      setCourses(sortedData);
    } else {
      const sortedData = [...CourseData].sort((a, b) => {
        const dateA = a.rating;
        const dateB = b.rating;
        return dateA - dateB;
      });
      setCourses(sortedData);
    }
  };

  const handleCategory = (value, id) => {
    setCategoryId(id);
    let CourseData = [...data];

    if (value === "all") {
      setCourses(CourseData);
    } else {
      const filterData = CourseData.filter((c) =>
        c.category.includes(value.toLowerCase())
      );
      setCourses(filterData);
    }
  };

  if (isError) {
    return (
      <article className="w-full px-2 lg:px-28 relative">
        <p className="w-full text-lg font-medium text-gray-700 dark:text-white text-center my-16">
          {language.err}
        </p>
      </article>
    );
  } else if (isLoading) {
    return (
      <article className="w-full px-2 lg:px-28 relative">
      <nav className="my-8">
      <SkeletonTitle />
      </nav>
      <div className="flex md:flex-row w-full gap-4 relative pb-6">
        <SkeletonList />
        <div className="w-full md:w-[70%] lg:w-[75%] h-fit grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-3" >
        <SkeletonCourseCard />
        <SkeletonCourseCard />
        <SkeletonCourseCard />
        </div>
      </div>

      </article>
    )
  } else {
    return (
      <article className="w-full px-2 lg:px-28 relative">
      <nav className="flex sticky top-0 left-0 z-20 gap-4 items-center justify-between my-8 p-2 bg-white border border-gray-200 dark:border-0 rounded-lg drop-shadow-md dark:bg-neutral-700 ">
        <h1 className="hidden md:block flex-2 md:flex-none text-sm md:text-base font-medium text-gray-700 dark:text-white">
          {language.title}
        </h1>
        <div className="block md:hidden h-fit w-fit">
          <svg className="w-6 h-6 text-gray-700 dark:text-white"
            onClick={() => setOpenCategory(!openCategory)}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            {openCategory ? (
              <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.828-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.828 4.828 4.828z" />
            ) : (
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            )}
          </svg>
          {openCategory && (
            <div className={`w-52 h-fit absolute z-40 top-14 ${selectedLang === "en" ? "left-0" : "right-0" } bg-white border border-gray-200 dark:bg-neutral-700 dark:border-0 rounded-md drop-shadow-xl overflow-hidden`}>
              {categoryData?.map((item) => (
                <h2
                  key={item.id}
                  onClick={() =>
                    categoryId === item.id
                      ? handleCategory("all", 0)
                      : handleCategory(item.value, item.id)
                  }
                  className={`text-sm lg:text-base font-medium py-2 px-3 md:py-3 md:px-4 text-gray-600 dark:text-white dark:hover:text-gray-300 transition-all hover:cursor-pointer ${
                    item.id === categoryId
                      ? "bg-primary text-white dark:hover:text-white"
                      : "hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {item.name}
                </h2>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 md:flex-none items-center bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md focus:border-primary dark:focus:border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mx-2 text-gray-500 dark:text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="search"
            placeholder={language.searchPlaceholder}
            className="w-full md:w-72 h-fit p-2 text-sm text-gray-600 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none border-none bg-transparent"
          />
        </div>

        <div className="flex flex-2 md:flex-none gap-2">
          <select
            id="sort"
            className="text-sm text-gray-700 dark:text-white bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 dark:placeholder-gray-400 rounded-md focus:ring-primary focus:border-primary block w-fit p-2  dark:focus:ring-primary dark:focus:border-primary outline-none"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="newest">{language.sort.newest}</option>
            <option value="oldest">{language.sort.oldest}</option>
            <option value="topRating">{language.sort.highestRating}</option>
            <option value="lesRating">{language.sort.lowestRating}</option>
          </select>
        </div>
      </nav>

      <div className="flex md:flex-row w-full gap-4 relative pb-6">
        <div className="hidden md:block w-full md:w-[30%] lg:w-[25%] h-full sticky top-20 left-0 bg-white border border-gray-200 dark:bg-neutral-700 dark:border-0 rounded-md drop-shadow-md overflow-hidden">
          {categoryData?.map((item) => (
            <h2
              key={item.id}
              onClick={() =>
                categoryId === item.id
                  ? handleCategory("all", 0)
                  : handleCategory(item.value, item.id)
              }
              className={`text-sm lg:text-base font-medium py-2 px-3 md:py-3 md:px-4 text-gray-600 dark:text-white dark:hover:text-gray-300 transition-all hover:cursor-pointer ${
                item.id === categoryId
                  ? "bg-primary text-white dark:hover:text-white"
                  : "hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {item.name}
            </h2>
          ))}
        </div>

        <div className={`w-full md:w-[70%] lg:w-[75%] h-fit grid gap-2 md:gap-4 ${
            courses?.length === 0
              ? "place-self-center"
              : "grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {(courses ? courses : data)?.map((item) => (
              <CourseCard
                key={item._id}
                img={item?.image}
                title={item?.title}
                category={item?.category}
                rating={item?.rating}
                id={item?._id}
              />
          ))}
          {courses?.length === 0 && (
            <h2 className="text-lg font-medium text-gray-700 dark:text-white text-center ">
              {language.noCourse}
            </h2>
          )}
        </div>
      </div>
    </article>
    )
  }
};
