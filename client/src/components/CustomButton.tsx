const CustomButton = ({
  btnType,
  handleClick,
  styles,
  title,
  disabled,
}: any) => {
  return (
    <button
      type={btnType}
      className={`${styles} p-3 rounded-lg text-sm cursor-pointer outline-none font-epilogue transition-all duration-300 ease-in-out`}
      onClick={handleClick}
      disabled={disabled ?? false}
    >
      {title}
    </button>
  );
};

export default CustomButton;
