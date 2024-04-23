import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TasteBit({ text, icon, cols}) {
  return (
    <div className={`col-span-1 lg:col-span-${cols} text-3xl text-gray-200 font-bold flex bg-gray-800 p-6 items-center gap-8 rounded-xl w-full`}>
      <div className='p-4 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full text-4xl aspect-square w-16 h-16 flex justify-center items-center transition-all duration-200 hover:saturate-150 hover:bg-gradient-to-tl'>
        <FontAwesomeIcon icon={icon} className='text-white drop-shadow-2xl z-10' />
      </div>
      <div className="font-medium text-2xl">{text}</div>
    </div>
  );
}
