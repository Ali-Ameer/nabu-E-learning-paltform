import Slider from "react-slick";
import { CourseCard } from "./CourseCard";
import { useGetAllCourseQuery } from "../services/courseApi";
import { SkeletonCourseCard } from "./Skeleton/SkeletonCourseCard";
import "slick-carousel/slick/slick.css";
import { memo } from "react";

const Carousel = () => {
  let { data, isLoading, isError } = useGetAllCourseQuery();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
    lazyLoad: "ondemand",
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (isError) {
    return (
        <p className="w-full text-lg font-medium text-gray-700 dark:text-white text-center my-16">
          something went wrong !
        </p>
    );
  } else if (isLoading) {
    return (
        <div className="w-full h-fit grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4" >
          <SkeletonCourseCard/>
          <SkeletonCourseCard customClass="hidden md:block"/>
          <SkeletonCourseCard customClass="hidden lg:block"/>
          <SkeletonCourseCard customClass="hidden lg:block"/>
        </div>
    )
  } 
  else {
    return (
      <Slider {...settings} className="w-full">
          {data?.map(c => 
        <div key={c?._id} className="px-1 pb-2">
          <CourseCard img={c?.image} title={c?.title} category={c?.category} rating={c?.rating} id={c?._id} />
        </div>
        )}
      </Slider>
    );
  }
};

export default memo(Carousel)