import { menu, search, thirdweb } from "../assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { logo } from "../assets";
import Icon from "./Icon";
import { navlinks } from "../constants";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "../client";
import { inAppWallet, createWallet } from "thirdweb/wallets";

const Navbar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "discord", "telegram", "email", "x", "phone"],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.trustwallet.app"),
    createWallet("com.coinbase.wallet"),
    createWallet("io.rabby"),
    createWallet("com.binance"),
  ];

  return (
    <nav className="flex justify-between flex-col-reverse md:flex-row gap-4">
      <div className="relative flex items-center max-sm:mx-auto rounded-[2rem] bg-primary-bg hover:bg-secondary-bg w-[80%] md:w-[45%] h-[3rem] transition-all duration-300 ease-in-out">
        <input
          className="placeholder:text-placeholder-text font-epilogue text-white text-[0.85rem] p-3 bg-transparent border-0 outline-none w-full"
          type="search"
          name="search"
          placeholder="Search for Campaigns"
        />
        <button className="bg-green-bg rounded-[2rem] w-[4rem] h-[2rem] flex justify-center items-center cursor-pointer mr-2 hover:bg-green-bg-hover">
          <img src={search} alt="search-icon" />
        </button>
      </div>
      <div className="gap-4 items-center hidden sm:flex justify-end">
        <div className="flex flex-col gap-5">
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={darkTheme({
              colors: {
                accentText: "hsl(151, 57%, 55%)",
                accentButtonBg: "hsl(151, 57%, 55%)",
                primaryButtonBg: "hsl(151, 57%, 55%)",
                primaryButtonText: "hsl(0, 100%, 98%)",
                secondaryButtonBg: "hsl(151, 57%, 55%)",
                secondaryButtonHoverBg: "hsl(151, 54%, 40%)",
                connectedButtonBg: "hsl(358, 89%, 55%)",
                connectedButtonBgHover: "hsl(356, 91%, 40%)",
                secondaryText: "hsl(251, 59%, 95%)",
              },
            })}
            connectModal={{ size: "wide", showThirdwebBranding: false }}
          />
        </div>

        <Link to={"/profile"}>
          <div className="rounded-[50%] p-4 w-[52px] h-[52px] bg-secondary-bg">
            <img src={thirdweb} alt="Avatar" />
          </div>
        </Link>
      </div>

      {/* Mobile view hamburger menu */}

      <div className="flex sm:hidden justify-between items-center w-full">
        <Link to={"/"}>
          <Icon imageUrl={logo} styles={`bg-secondary-bg w-[3rem] h-[3rem]`} />
        </Link>
        <Icon
          imageUrl={menu}
          styles={`h-[4.5rem] w-[4.5rem]`}
          handleClick={() => {
            setToggle((prevState) => !prevState);
          }}
        />
      </div>

      {/* Mobile Menu */}
      {toggle && (
        <div
          className={`transition-all duration-700 absolute top-[6rem] right-3 left-3 flex sm:hidden bg-primary-bg rounded-xl overflow-hidden ${
            toggle ? "translate-y-0" : "-translate-y-[100vh]"
          } shadow-secondary z-10`}
        >
          <div className="flex flex-col w-full pt-2">
            {navlinks.map((link) => (
              <div
                className={`${
                  link.name === isActive && `bg-secondary-bg`
                } pl-4 flex items-center gap-2 h-[4rem] transition-all duration-200 ease-in-out`}
                onClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name);
                    setToggle(false);
                    navigate(link.link);
                  }
                }}
                key={link.name}
              >
                <Icon
                  imageUrl={link.imgUrl}
                  disabled={link?.disabled}
                  isActive={isActive}
                  name={link.name}
                  styles={`w-[3rem] h-[3rem]`}
                />
                <span
                  className={`${
                    link.name === isActive ? `text-green-bg` : `text-gray-300`
                  } text-[0.9rem]`}
                >
                  {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                </span>
              </div>
            ))}
            <div className="flex justify-center items-center w-full mb-5 mt-5">
              <ConnectButton
                client={client}
                wallets={wallets}
                theme={darkTheme({
                  colors: {
                    accentText: "hsl(151, 57%, 55%)",
                    accentButtonBg: "hsl(151, 57%, 55%)",
                    primaryButtonBg: "hsl(151, 57%, 55%)",
                    primaryButtonText: "hsl(0, 100%, 98%)",
                    secondaryButtonBg: "hsl(151, 57%, 55%)",
                    secondaryButtonHoverBg: "hsl(151, 54%, 40%)",
                    connectedButtonBg: "hsl(358, 89%, 55%)",
                    connectedButtonBgHover: "hsl(356, 91%, 40%)",
                    secondaryText: "hsl(251, 59%, 95%)",
                  },
                })}
                connectModal={{ size: "wide", showThirdwebBranding: false }}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
