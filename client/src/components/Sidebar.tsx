import { useState } from "react";
import { logo, sun } from "../assets";
import { useNavigate, Link } from "react-router";
import { navlinks } from "../constants";
import { Icon } from "./";

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate();

  function handleClick(link: any) {
    if (!link.disabled) {
      setIsActive(link.name);
      navigate(link.link);
    }
  }

  return (
    <div className="flex flex-col sticky h-[93dvh] justify-center items-center top-5">
      <Link to={"/"}>
        <Icon
          imageUrl={logo}
          styles={`bg-secondary-bg w-[3.5rem] h-[3.5rem]`}
        />
      </Link>

      <div className="flex flex-col flex-1 justify-between items-center bg-primary-bg rounded-[1.25rem] w-[4.8rem] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3 ">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              imageUrl={link.imgUrl}
              disabled={link?.disabled}
              name={link.name}
              isActive={isActive}
              styles={`w-[3rem] h-[3rem]`}
              handleClick={() => {
                handleClick(link);
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
