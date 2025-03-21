// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {

    struct Campaign {
        address owner;
        string title;
        string description;
        uint target;
        uint deadline;
        uint amountCollected;
        string image;
        address[] donors;
        uint[] donations;
    }

    mapping(uint => Campaign) public campaigns;
    uint public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title,string memory _description, uint _target, uint _deadline, string memory _image) public returns(uint){

        require(_deadline > block.timestamp, "Deadline must be a time in the future");

        campaigns[numberOfCampaigns] = Campaign({
                owner: _owner,
                title: _title,
                description: _description,
                target: _target,
                deadline: _deadline,
                amountCollected: 0,       
                image: _image,
                donors: new address[](0),
                donations: new uint[](0)
            });

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint _campaignId) public payable returns(string memory) {
        uint amount = msg.value;

        require(_campaignId < numberOfCampaigns, "Campaign does not exist");
        require(campaigns[_campaignId].deadline > block.timestamp, "Campaign deadline has passed");

        (bool success, ) = payable(campaigns[_campaignId].owner).call{value:amount}("");

        require(success, "Funding Failed, Please Try Again");

        campaigns[_campaignId].amountCollected += amount;
        campaigns[_campaignId].donors.push(msg.sender);
        campaigns[_campaignId].donations.push(amount);

        return "Donation Successful";
    }

    function getDonors(uint _campaignId)public view returns(address[]  memory, uint[] memory){
        require(_campaignId < numberOfCampaigns, "Campaign does not exist");
        return (campaigns[_campaignId].donors, campaigns[_campaignId].donations);
    }

    function getCampaigns()public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++){
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }
}