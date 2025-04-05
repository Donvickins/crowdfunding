const FormField = ({
  type,
  labelName,
  isTextArea,
  name,
  placeholder,
  inputValue,
  handleChange,
}: any) => {
  return (
    <label htmlFor={name} className="flex flex-col flex-1 gap-3">
      <span className="font-epilogue text-gray-500 font-semibold text-[0.85rem]">
        {labelName}
      </span>
      {isTextArea ? (
        <textarea
          value={inputValue}
          required
          name={name}
          id={name}
          placeholder={placeholder}
          rows={8}
          className="overflow-scroll resize-none transition-all duration-300 focus:ring focus:ring-secondary-bg outline-none bg-transparent rounded-lg font-epilogue border-[1px] border-secondary-bg p-3 text-white placeholder:text-placeholder-text placeholder:text-[0.85rem]"
        />
      ) : (
        <input
          value={inputValue}
          className="transition-all duration-300 focus:ring focus:ring-secondary-bg outline-none bg-transparent rounded-lg font-epilogue border-[1px] border-secondary-bg p-3 text-white placeholder:text-placeholder-text placeholder:text-[0.85rem]"
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required
          onChange={handleChange}
        />
      )}
    </label>
  );
};

export default FormField;
