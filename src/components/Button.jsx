import { useCallback } from "react";

export default function Button({ title = "submit", type, customClass, onClick, icon }) {

  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <button 
    className={`flex h-fit gap-2 items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-all border-2 border-primary
    ${type === "primary" 
    ? "bg-primary text-white hover:bg-transparent hover:text-primary" 
    : "bg-transparent text-primary hover:bg-primary hover:text-white"} ${customClass ? customClass : null}`}
    onClick={handleClick}
    >{title} {icon}</button>
  )
}