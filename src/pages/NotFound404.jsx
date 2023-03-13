import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';

export default function NotFound404() {
  const navigate = useNavigate()
  return (
    <section className="flex items-center h-[calc(100vh-60px)] p-16 dark:bg-gray-900 dark:text-gray-100">
    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div className="max-w-md flex flex-col items-center justify-center text-center">
        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
        <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>

        <Button title=" Back to homepage " type="primary" onClick={() => navigate("/")}/>
      </div>
    </div>
  </section>
  );
};
