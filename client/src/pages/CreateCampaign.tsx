import { useState } from "react";
import { FormField, Icon, CustomButton } from "../components";
import { money } from "../assets";
const CreateCampaign = () => {
  const [campaignDetails, setCampaignDetails] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    image: "",
    name: "",
  });

  function handleFormFieldChange(field: string, e: any) {
    setCampaignDetails({ ...campaignDetails, [field]: e.target.value });
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(campaignDetails);
  }
  return (
    <div className="flex flex-col justify-center items-center rounded-lg bg-primary-bg w-full p-10 mt-10">
      <h1 className="bg-secondary-bg h-[4rem] rounded-lg font-bold font-epilogue leading-6 text-[1.5rem] flex justify-center items-center w-[20rem]">
        Start A Campaign
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col mt-12 gap-8"
      >
        <div className="flex flex-wrap gap-12">
          <FormField
            labelName={"Your Name *"}
            type={"text"}
            name={"name"}
            placeholder={"John Doe"}
            onChange={(name: string, e: any) => {
              handleFormFieldChange(name, e);
            }}
          />
          <FormField
            labelName={"Campaign title *"}
            type={"text"}
            name={"title"}
            placeholder={"Write a title for your campaign"}
            onChange={(title: string, e: any) => {
              handleFormFieldChange(title, e);
            }}
          />
        </div>
        <FormField
          labelName={"Campaign description *"}
          isTextArea
          name={"description"}
          placeholder={"Write a description for your campaign"}
          onChange={(description: string, e: any) => {
            handleFormFieldChange(description, e);
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
            labelName={"Goal *"}
            type={"text"}
            name={"goal"}
            placeholder={"Eth 0.50"}
            onChange={(goal: string, e: any) => {
              handleFormFieldChange(goal, e);
            }}
          />
          <FormField
            labelName={"Campaign end date *"}
            type={"date"}
            name={"deadline"}
            placeholder={"Write a title for your campaign"}
            onChange={(deadline: string, e: any) => {
              handleFormFieldChange(deadline, e);
            }}
          />
        </div>
        <FormField
          labelName={"Campaign image *"}
          type={"url"}
          name={"image"}
          placeholder={"Place a link to an image of your campaign"}
          onChange={(image: string, e: any) => {
            handleFormFieldChange(image, e);
          }}
        />
        <CustomButton
          styles={`bg-green-bg hover:bg-green-bg-hover`}
          btnType={"submit"}
          title={"Create Campaign"}
        />
      </form>
    </div>
  );
};

export default CreateCampaign;
