import { menu, search, thirdweb } from "../assets";
import { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { FormField } from "./";
import { Link, useNavigate } from "react-router";
import { logo } from "../assets";
import Icon from "./Icon";
import { navlinks } from "../constants";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useConnect,
  useDisconnect,
} from "thirdweb/react";
import { client } from "../client";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { preAuthenticate } from "thirdweb/wallets/in-app";

const Navbar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const activeAccount = useActiveAccount();
  const connectedWallet = useActiveWallet();

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [isVerification, setIsVerification] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }, [email]);

  async function sendVerificationCode(clientEmail: string) {
    try {
      await preAuthenticate({
        client,
        strategy: "email",
        email: clientEmail,
      });
    } catch (err: any) {
      if (err instanceof Error && err.message.includes("CORS")) {
        console.error("CORS Error: ", err);
        alert("CORS Error: Please check your server configuration.");
        return;
      }
      console.error(
        `Error Sending Verification Mail to ${clientEmail}:`,
        err?.message
      );
      alert(
        `Error Sending Verification Mail to ${clientEmail}: ${err?.message}`
      );
      return;
    }
  }

  async function handleLogin(clientEmail: string, verificationCode: string) {
    try {
      await connect(async () => {
        const wallet = inAppWallet();
        await wallet.connect({
          client,
          strategy: "email",
          email: clientEmail,
          verificationCode: verificationCode,
        });
        return wallet;
      });
    } catch (err: any) {
      console.error("Error connecting wallet: ", err?.message);
    }
  }

  async function handleAuthFlow() {
    if (activeAccount && connectedWallet) {
      disconnect(connectedWallet);
      setEmail("");
      setIsVerification(false);
      setVerificationCode("");
      setIsValidEmail(false);
    } else {
      if (!isVerification) {
        if (!isValidEmail) {
          alert("Please enter a valid email address.");
          return;
        } else {
          setIsValidEmail(true);
          try {
            await sendVerificationCode(email);
          } catch (err) {
            return;
          }

          setIsVerification(true);
          setVerificationCode("");
        }
      } else {
        await handleLogin(email, verificationCode);
        setEmail("");
        setVerificationCode("");
        setIsVerification(false);
        setIsValidEmail(false);
      }
    }
  }

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
          {!(activeAccount && connectedWallet) &&
            (!isVerification ? (
              <FormField
                key={"email"}
                name="email"
                type="input"
                labelName="Sign in with e-mail"
                placeholder="example@email.com"
                value={email}
                handleChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
            ) : (
              <FormField
                key={"verificationCode"}
                name="verificationCode"
                type="input"
                labelName="Enter Verification Code"
                placeholder="Verification Code"
                value={verificationCode}
                handleChange={(e: any) => {
                  setVerificationCode(e.target.value);
                }}
              />
            ))}
          <CustomButton
            btnType="button"
            styles={`${
              activeAccount && connectedWallet
                ? `bg-red-400 hover:bg-red-600`
                : `bg-gray-100 px-5 text-gray-800 hover:bg-gray-300`
            }`}
            title={`${
              activeAccount && connectedWallet
                ? "Disconnect Wallet"
                : isVerification
                ? "Verify Code"
                : isValidEmail
                ? "Send Verification Code"
                : "Sign In"
            }`}
            handleClick={handleAuthFlow}
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
                  }`}
                >
                  {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                </span>
              </div>
            ))}
            <div className="flex justify-center items-center w-full mb-5 mt-5">
              {/* <CustomButton
                btnType="button"
                styles={`${
                  address
                    ? `bg-green-bg hover:bg-green-bg-hover`
                    : `bg-gray-100 px-5 text-gray-800 hover:bg-gray-300`
                } w-[45%]`}
                title={address ? "Create Campaign" : "Connect Wallet"}
                handleClick={() => {
                  if (address) {
                    navigate("/create-campaign");
                  }
                }}
              /> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
