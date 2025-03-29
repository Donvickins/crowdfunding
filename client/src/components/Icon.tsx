const Icon = ({
  isActive,
  styles,
  name,
  imageUrl,
  disabled,
  handleClick,
}: any) => {
  return (
    <div
      className={`${styles} flex justify-center items-center rounded-[10px] ${
        isActive && isActive === name && "bg-secondary-bg"
      } ${!disabled && "cursor-pointer"} `}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imageUrl} alt="company_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imageUrl}
          alt="company_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
};

export default Icon;
