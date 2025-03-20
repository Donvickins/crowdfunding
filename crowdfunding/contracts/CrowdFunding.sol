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
    };

    mapping(uint => Campaign) public campaigns;
    uint public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title,string _description, uint _target, uint _deadline, string memory _image) public returns(uint){

        require(_deadline > block.timestamp, "Deadline must be a time in the future");

        Campaign storage newCampaign = Campaign storage newCampaign = Campaign({
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

        campaigns[numberOfCampaigns] = newCampaign;
        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint _id) public returns(string memory) {
        uint amount = msg.value;

        require(_id < numberOfCampaigns, "Campaign does not exist");
        require(campaigns[_id].deadline > block.timestamp, "Campaign deadline has passed");

        (bool success, ) = payable(campaigns[_id].owner).transfer(amount);

        require(success, "Transfer failed.");

        campaigns[_id].amountCollected += amount;
        campaigns[_id].donors.push(msg.sender);
        campaigns[_id].donations.push(amount);

        return "Donation successful";
    }

    function getDonors(){}

    function getCampaigns(){}
}