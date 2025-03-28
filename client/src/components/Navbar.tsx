import { ConnectButton } from "thirdweb/react";
import { search, thirdweb } from "../assets";
import { client } from "../client";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <label
        htmlFor="search-campaign"
        className="lg:flex-1 flex max-w-[30rem] bg-[#1c1c24] rounded-[2rem] items-center hover:bg-[#34343f] transition-all duration-300"
      >
        <input
          className="placeholder:text-[4b5264] text-white text-[1rem] p-3 bg-transparent border-0 focus:outline-none w-full"
          type="search"
          name="search"
          id="search-campaign"
          placeholder="Search for campaigns"
        />
        <button className="bg-[#4acd8d] rounded-[2rem] w-[4rem] h-[2rem] flex justify-center items-center cursor-pointer mr-2 hover:bg-[#2f9c67]">
          <img src={search} alt="search-icon" />
        </button>
      </label>
      <div className="flex gap-4 items-center">
        <ConnectButton client={client} />
        <div className="rounded-[50%] p-4 w-[52px] h-[52px] bg-[#34343f]">
          <img src={thirdweb} alt="Avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
