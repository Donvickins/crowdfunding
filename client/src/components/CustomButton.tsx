const CustomButton = ({ btnType, handleClick, styles, title }: any) => {
  return (
    <button
      type={btnType}
      className={`${styles} p-3 rounded-lg text-white font-semibold cursor-pointer  transition-all duration-200 ease-in-out`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
