import { useState } from "react";
import { FormField, Icon, CustomButton, Loading } from "../components";
import { money } from "../assets";
import { useStateContext } from "../contexts";
import { checkIfImage } from "../utils";
import { ethers } from "ethers";
import { useNavigate } from "react-router";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import { sepolia } from "thirdweb/chains";

const CreateCampaign = () => {
  const [campaignDetails, setCampaignDetails] = useState({
    title: "",
    description: "",
    target: "",
    deadline: 0,
    image: "",
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign, activeAccount } = useStateContext()!;
  const navigate = useNavigate();
  const activeChain = useActiveWalletChain();
  const setActiveChain = useSwitchActiveWalletChain();

  function handleFormFieldChange(field: string, e: any) {
    setCampaignDetails((prevDetails) => {
      let updatedField = { [field]: e.target.value };
      if (field === "deadline") {
        const deadlineTimestamp = new Date(e.target.value).getTime();
        updatedField = { [field]: deadlineTimestamp };
      }
      return {
        ...prevDetails,
        ...updatedField,
      };
    });
  }
  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!(activeChain?.id === sepolia.id)) {
      await setActiveChain(sepolia);
    }

    checkIfImage(campaignDetails.image, async (exists: boolean) => {
      if (exists) {
        setIsLoading(true);
        const receipt = await createCampaign({
          ...campaignDetails,
          target: ethers.parseEther(campaignDetails.target),
        });
        if (receipt) {
          setIsLoading(false);
          navigate("/");
        } else {
          setIsLoading(false);
          alert("Error Sending Transaction");
        }
      } else {
        alert("Please provide a valid image URL");
        setCampaignDetails((prevState) => ({ ...prevState, image: "" }));
      }
    });
  }
  return (
    <div className="flex flex-col justify-center items-center rounded-lg bg-primary-bg w-full p-10 mt-10">
      {isLoading && <Loading />}
      <h1 className="bg-secondary-bg h-[4rem] rounded-lg font-bold font-epilogue leading-6 text-[1.5rem] flex justify-center items-center w-[20rem]">
        Start A Campaign
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col mt-12 gap-8"
        style={{
          pointerEvents: isLoading ? "none" : "auto",
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        <div className="flex flex-wrap gap-12">
          <FormField
            inputValue={campaignDetails.name}
            labelName={"Your Name *"}
            type={"text"}
            name={"name"}
            placeholder={"John Doe"}
            handleChange={(e: any) => {
              handleFormFieldChange("name", e);
            }}
          />
          <FormField
            inputValue={campaignDetails.title}
            labelName={"Campaign title *"}
            type={"text"}
            name={"title"}
            placeholder={"Write a title for your campaign"}
            handleChange={(e: any) => {
              handleFormFieldChange("title", e);
            }}
          />
        </div>
        <FormField
          inputValue={campaignDetails.description}
          labelName={"Campaign description *"}
          isTextArea
          name={"description"}
          placeholder={"Write a description for your campaign"}
          handleChange={(e: any) => {
            handleFormFieldChange("description", e);
          }}
        />
        <div className="flex justify-start items-center w-full rounded-xl bg-purple-500 p-2 h-32">
          <Icon imageUrl={money} styles={`w-[6rem] h-[6rem]`} />
          <span className="font-bold font-epilogue leading-6 text-[1.5rem]">
            You will get 100% of the raised amount
          </span>
        </div>
        <div className="flex flex-wrap gap-12">
          <FormField
            inputValue={campaignDetails.target}
            labelName={"Goal *"}
            type={"text"}
            name={"target"}
            placeholder={"Eth 0.50"}
            handleChange={(e: any) => {
              handleFormFieldChange("target", e);
            }}
          />
          <FormField
            inputValue={
              campaignDetails.deadline
                ? new Date(campaignDetails.deadline).toISOString().split("T")[0]
                : ""
            }
            labelName={"Campaign end date *"}
            type={"date"}
            name={"deadline"}
            placeholder={"Write a title for your campaign"}
            handleChange={(e: any) => {
              handleFormFieldChange("deadline", e);
            }}
          />
        </div>
        <FormField
          inputValue={campaignDetails.image}
          labelName={"Campaign image *"}
          type={"url"}
          name={"image"}
          placeholder={"Place a link to an image of your campaign"}
          handleChange={(e: any) => {
            handleFormFieldChange("image", e);
          }}
        />
        {activeAccount ? (
          <CustomButton
            styles={`bg-green-bg hover:bg-green-bg-hover font-epilogue py-5`}
            btnType={"submit"}
            title={"Create Campaign"}
          />
        ) : (
          <CustomButton
            styles={`bg-secondary-bg grayscale font-epilogue py-5`}
            btnType={"text"}
            title={"Connect Wallet"}
            disabled={true}
          />
        )}
      </form>
    </div>
  );
};

export default CreateCampaign;
