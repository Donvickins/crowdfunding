import { useState } from "react";
import { logo, sun } from "../assets";
import { useNavigate, Link } from "react-router";
import { navlinks } from "../constants";

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
      className={`${styles} flex justify-center items-center rounded-[10px] w-[48px] h-[48px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
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

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sticky h-[93dvh] justify-center items-center top-5">
      <Link to={"/"}>
        <Icon imageUrl={logo} styles={`bg-[#2c2f32]`} />
      </Link>

      <div className="flex flex-col flex-1 justify-between items-center bg-[#1c1c24] rounded-[1.25rem] w-[4.8rem] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3 ">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              imageUrl={link.imgUrl}
              disabled={link?.disabled}
              name={link.name}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon imageUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
