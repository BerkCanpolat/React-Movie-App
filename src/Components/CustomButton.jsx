const CustomButton = ({ title, icon, className = "" }) => {
  return (
    <button className={`text-white flex items-center justify-center gap-3 border rounded-[10px] w-50 h-12 max-md:w-35 max-md:h-10 max-md:text-sm cursor-pointer ${className}`}>
        {icon}
        {title}
    </button>
  );
};

export default CustomButton;
