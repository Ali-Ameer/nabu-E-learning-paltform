import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { selectLanguageData } from "../features/langSlice";
import { selectUserLoggedIn, setToken, setUser } from "../features/userSlice";
import { useSingUpMutation } from "../services/UserApi";

export default function SignUp() {
  const [singUp, {isLoading, isError}] = useSingUpMutation();
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const isLoggedIn = useSelector(state => selectUserLoggedIn(state))
  const language = useSelector(state => selectLanguageData(state, "signUp"))

  useEffect(() => {
    isLoggedIn ? navigate(-1) : null;
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
      singUp(formData).unwrap()
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.user._id));
        dispatch(setUser({loggedIn: true, data:{ ...res.user}}), setToken({...res.accessToken}))
        navigate(-1);
      })
      .catch(err => {
        console.log(err)
      })

  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="bg-white dark:bg-neutral-700 p-6 rounded-lg drop-shadow-lg w-full md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg text-gray-700 dark:text-white font-bold mb-4 text-center">
          {language.title}
        </h2>
        {isError && <h2 className="text-base text-red-700 text-center font-medium my-4 transition-all">
            {language.errMsg}
          </h2>
        }
        <div className="mb-4">
          <label
            className="block text-base font-medium text-gray-700 dark:text-white mb-2"
            htmlFor="name"
          >
            {language.name}
          </label>
          <input dir="ltr"
            type="text"
            className="w-full p-2 bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-md text-sm text-gray-600 dark:text-gray-200 font-medium outline-none focus:border-primary"
            id="name"
            onChange={(e) => formData.name = e.target.value}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-base font-medium text-gray-700 dark:text-white mb-2"
            htmlFor="username"
          >
            {language.username}
          </label>
          <input dir="ltr"
            type="text"
            className="w-full p-2 bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-md text-sm text-gray-600 dark:text-gray-200 font-medium outline-none focus:border-primary"
            id="username"
            onChange={(e) => formData.username = e.target.value}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-base font-medium text-gray-700 dark:text-white mb-2"
            htmlFor="email"
          >
            {language.email}
          </label>
          <input dir="ltr"
            type="email"
            className="w-full p-2 bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-md text-sm text-gray-600 dark:text-gray-200 font-medium outline-none focus:border-primary"
            id="email"
            onChange={(e) => formData.email = e.target.value}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-base font-medium text-gray-700 dark:text-white mb-2"
            htmlFor="password"
          >
            {language.password}
          </label>
          <input dir="ltr"
            type="password"
            className="w-full p-2 bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-md text-sm text-gray-600 dark:text-gray-200 font-medium outline-none focus:border-primary"
            id="password"
            onChange={(e) => formData.password = e.target.value}
          />
        </div>

        <Button title={isLoading ? language.loading : language.btnSignUp} type="primary" customClass="w-full"/>
      </form>
    </div>
  );
};
