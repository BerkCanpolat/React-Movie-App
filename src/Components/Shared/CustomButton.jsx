import { useState } from "react";

const CustomButton = ({
  title,
  icon,
  activeTitle,
  activeIcon,
  className = "",
  onClick,
  isActive: externalActive = false,
}) => {
  const [internalActive, setInternalActive] = useState(false);

  const isActive = externalActive ?? internalActive;

  const handleClick = (e) => {
    setInternalActive(!internalActive);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-3 border rounded-[10px] max-md:text-sm cursor-pointer transition-all duration-300
      ${
        isActive
          ? "bg-emerald-600 text-white border-emerald-500"
          : "text-white border-gray-400 hover:bg-white/10"
      }
      ${className}`}
    >
      {isActive ? activeIcon : icon}
      {isActive ? activeTitle : title}
    </button>
  );
};

export default CustomButton;
