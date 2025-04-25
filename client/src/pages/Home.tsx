import { useReadContract } from "thirdweb/react";
import { useState, useEffect } from "react";
import { DisplayCampaigns, Loading } from "../components";
import { CampaignData, useStateContext } from "../contexts";

const Home = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);

  const { contract, isContractLoaded } = useStateContext();

  // const { data } = useReadContract({
  //   contract: contract!,
  //   method:
  //     "function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donors, uint256[] donations)[])",
  //   params: [],
  // });

  useEffect(() => {}, [contract]);

  return (
    <div className="text-white flex flex-col justify-center items-center rounded-lg bg-primary-bg w-full p-10 mt-10">
      {!isContractLoaded ? (
        <Loading />
      ) : (
        <DisplayCampaigns campaigns={campaigns} isLoading={!isContractLoaded} />
      )}
    </div>
  );
};

export default Home;
