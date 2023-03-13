import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar } from "./components/Navbar";
import { Spinner } from "./components/Spinner";
const RequireAuth = lazy(()=> import("./components/RequireAuth"));
const Home = lazy(()=> import("./pages/Home"));
const Contact = lazy(()=> import("./pages/Contact"));
const Dashboard = lazy(()=> import("./pages/Dashboard"));
const UserEnrolledCourses = lazy(()=> import("./components/userEnrolledCourses"));
const Course = lazy(()=> import("./pages/Course"));
const CourseDetails = lazy(()=> import("./pages/CourseDetails"));
const CoursePage = lazy(()=> import("./pages/CoursePage"));
const UserInfoAndUpdate = lazy(()=> import("./components/UserInfoAndUpdate"));
const LogIn = lazy(()=> import("./pages/LogIn"));
const SignUp = lazy(()=> import("./pages/SinUp"));
const NotFound404 = lazy(()=> import("./pages/NotFound404"));

function App() {
  const language = useSelector((state) => state.language.language);
  return (
    <div className={`App h-full dark:bg-neutral-800 ${language === "en" ? "font-poppins" : "font-tajawal"}`} >

    <Suspense fallback={<Spinner />}>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/details/:id" element={<CourseDetails />} />

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route element={<RequireAuth />} >
          <Route path="/dashboard" element={<Dashboard />} >
            <Route index path="user" element={<UserInfoAndUpdate />} />
            <Route path="course" element={<UserEnrolledCourses />}/>
          </Route>
          <Route path="/dashboard/course/:id" element={<CoursePage />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Routes>
      </Suspense>
    </div>
  )
}

export default App