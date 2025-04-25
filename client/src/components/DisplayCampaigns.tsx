import { Campaign } from "./";
import { CampaignData } from "../contexts";

const DisplayCampaigns = ({
  campaigns,
  isLoading,
}: {
  campaigns: CampaignData[];
  isLoading: boolean;
}) => {
  return (
    <div>
      {/* {!isLoading && campaigns.map((campaign) => <Campaign data={campaign} />)} */}
      Campaigns
    </div>
  );
};

export default DisplayCampaigns;
