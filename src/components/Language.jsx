import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserLanguage, setLanguage } from "../features/langSlice";

export const Language = () => {
  const language = useSelector(selectUserLanguage)
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.dir = language === "en" ? "ltr" : "rtl"
  },[language])

  return (
    <div className="flex items-center justify-center mx-1 hover:cursor-pointer"  
        onClick={() => dispatch( setLanguage(language === "ar" ? "en" : "ar") )}
    >
      {language === "ar"
        ? <h3 className="text-base text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer">En</h3>
        : <h3 className="text-base text-gray-700 font-medium hover:text-gray-800 transition-all dark:text-white dark:hover:text-gray-300 hover:cursor-pointer">Ar</h3>
      }
    </div>
  );
}