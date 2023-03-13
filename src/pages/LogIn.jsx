import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { selectLanguageData } from "../features/langSlice";
import { selectUserLoggedIn, setToken, setUser } from "../features/userSlice";
import { useLoginMutation } from "../services/UserApi";

export default function LogIn() {
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const language = useSelector(state => selectLanguageData(state, "login"))

  let dispatch = useDispatch()
  let navigate = useNavigate();

  const [email, setEmail] = useState("teacher1@mail.com");
  const [password, setPassword] = useState("12345678");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});


  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = language.requiredEmail;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = language.invalidEmail;
    }

    if (!password) {
      newErrors.password = language.requiredPassword;
    } else if (password.length < 8) {
      newErrors.password = language.invalidPassword;
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setUser({loggedIn: true, data: { ...res}}) )
        dispatch(setToken({accessToken: res.accessToken}) )
        localStorage.setItem("user", JSON.stringify(res._id));
        setMsg(language.welcome + " " +  res.name);
        setTimeout(() => {
          return navigate(-1);
        }, 1000);
      } catch (error) {
        console.error(error);
        return setMsg(language.errMsg);
      }
    }
  };

  useEffect(() => {
    isLoggedIn ? navigate(-1) : null;
  }, [isLoggedIn]);

  return (
    <div className="w-full h-[calc(100vh-60px)] grid place-items-center px-2 lg:px-28">
      <form
        className="w-full h-fit md:w-[50%] bg-white shadow-lg dark:bg-neutral-700 p-6 rounded-lg border border-gray-100 dark:border-none"
        onSubmit={(e) => handleLogin(e)}
      >
        <h2 className="text-lg text-gray-700 dark:text-white font-bold mb-4 text-center">
          {language.title } { <Link to="/signup" className="text-primary">{language.signUp}</Link>}
        </h2>
        {isSuccess && (
          <h2 className="text-base text-primary text-center font-medium my-4 transition-all">{msg}</h2>
        )}
        {isError && (
          <h2 className="text-base text-red-700 text-center font-medium my-4 transition-all">{msg}</h2>
        )}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
            htmlFor="username"
          >
            {language.email}
          </label>
          {errors.email && <p className="text-red-600 my-1">{errors.email}</p>}
          <input className="w-full bg-gray-100 dark:bg-neutral-800 p-3 rounded-md border border-gray-200 dark:border-neutral-600 text-sm text-gray-600 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary"
            id="username"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
            htmlFor="password"
          >
            {language.password }
          </label>
          {errors.password && (
            <p className="text-red-600 my-1">{errors.password}</p>
          )}
          <input
            className="w-full bg-gray-100 dark:bg-neutral-800 p-3 rounded-md border border-gray-200 dark:border-neutral-600 text-sm text-gray-600 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          title={isLoading ? language.loading : language.btnLogin }
          type="primary"
          onClick={(e) => handleLogin(e)}
        />
      </form>
    </div>
  );
};
