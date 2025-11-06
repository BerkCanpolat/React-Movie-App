const SliderBtn = ({ children, onClick, className = ""}) => {
  return (
    <button
      className={`dark:bg-gray-800 bg-red-500 absolute rounded-full p-1.5 cursor-pointer z-20 transition-opacity duration-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SliderBtn;
