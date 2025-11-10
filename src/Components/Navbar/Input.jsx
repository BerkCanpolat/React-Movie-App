const Input = ({ id, labelText, error, className = "", classNameLabel = "", ...props }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className={`dark:text-white text-black block mb-2 ${classNameLabel}`}>
        {labelText}
      </label>
      <input
        id={id}
        className={`dark:bg-black bg-white border dark:border-gray-600 rounded-lg outline-0 dark:text-white text-black w-full sm:pt-3 sm:pl-4 sm:pb-3 ${className}`}
        {...props}
      />
      {error && (
        <div className="text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;