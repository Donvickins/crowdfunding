import { client } from "../client";
import { ConnectButton } from "thirdweb/react";

const Home = () => {
  return (
    <div className="text-white">
      <ConnectButton client={client} />
    </div>
  );
};

export default Home;
