import { useSelector } from "react-redux";
import { selectLanguageData } from "../features/langSlice";

export const DataInfo = () => {
  const language = useSelector((state) =>
    selectLanguageData(state, "dataInfo")
  );
  const icons = [
    <svg
      fill="#fff"
      className="w-6 h-6"
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M623.1 136.9l-282.7-101.2c-13.73-4.91-28.7-4.91-42.43 0L16.05 136.9C6.438 140.4 0 149.6 0 160s6.438 19.65 16.05 23.09L76.07 204.6c-11.89 15.8-20.26 34.16-24.55 53.95C40.05 263.4 32 274.8 32 288c0 9.953 4.814 18.49 11.94 24.36l-24.83 149C17.48 471.1 25 480 34.89 480H93.11c9.887 0 17.41-8.879 15.78-18.63l-24.83-149C91.19 306.5 96 297.1 96 288c0-10.29-5.174-19.03-12.72-24.89c4.252-17.76 12.88-33.82 24.94-47.03l190.6 68.23c13.73 4.91 28.7 4.91 42.43 0l282.7-101.2C633.6 179.6 640 170.4 640 160S633.6 140.4 623.1 136.9zM351.1 314.4C341.7 318.1 330.9 320 320 320c-10.92 0-21.69-1.867-32-5.555L142.8 262.5L128 405.3C128 446.6 213.1 480 320 480c105.1 0 192-33.4 192-74.67l-14.78-142.9L351.1 314.4z" />
    </svg>,

    <svg
      className="w-6 h-6 "
      fill="#fff"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <g data-name="Layer 2" id="Layer_2">
        <circle cx="12" cy="6" r="4" />
        <path d="M12,10.83A9.17,9.17,0,0,0,5.26,9.9L4,10.22V21.28l1.74-.44a7.18,7.18,0,0,1,5.7,1l.55.37.55-.37a7.18,7.18,0,0,1,5.7-1l1.75.44V10.22L18.74,9.9A9.17,9.17,0,0,0,12,10.83Z" />
      </g>
    </svg>,

    <svg
      className="w-6 h-6"
      fill="#fff"
      version="1.1"
      viewBox="0 0 55 33"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M55.182,32.401l-0.51-30.825L43,13.249V5c0-2.762-2.238-5-5-5H5C2.238,0,0,2.238,0,5v23c0,2.762,2.238,5,5,5  h33c2.762,0,5-2.238,5-5v-7.781L55.182,32.401z" />
    </svg>,

    <svg
      className="w-6 h-6"
      fill="#fff"
      version="1.1"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="info" />
      <g id="icons">
        <g id="user">
          <ellipse cx="12" cy="8" rx="5" ry="6" />
          <path d="M21.8,19.1c-0.9-1.8-2.6-3.3-4.8-4.2c-0.6-0.2-1.3-0.2-1.8,0.1c-1,0.6-2,0.9-3.2,0.9s-2.2-0.3-3.2-0.9    C8.3,14.8,7.6,14.7,7,15c-2.2,0.9-3.9,2.4-4.8,4.2C1.5,20.5,2.6,22,4.1,22h15.8C21.4,22,22.5,20.5,21.8,19.1z" />
        </g>
      </g>
    </svg>,
  ];
  return (
    <div className="grid grid-cols-2 md:flex md:justify-between gap-6 py-5 bg-gray-100 dark:bg-neutral-700 px-2 lg:px-28">
      {language?.map((i, index) => (
        <AnalysisCard
          key={index}
          title={i.title}
          number={i.data}
          color={i.color}
          icon={icons[index]}
        />
      ))}
    </div>
  );
};

const AnalysisCard = ({ title, number, color, icon }) => {
  return (
    <div className="flex justify-start items-center gap-2">
      <div
        className={`w-12 h-12 bg-${color} rounded-full overflow-hidden flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg text-gray-700 dark:text-white font-medium">
          {number}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {title}
        </p>
      </div>
    </div>
  );
};
