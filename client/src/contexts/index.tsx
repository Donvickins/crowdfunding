import React, { useContext, createContext, useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import {
  ContractOptions,
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";
import { Account } from "thirdweb/wallets";
import { TransactionReceipt } from "thirdweb/dist/types/transaction/types";

export interface StateContextType {
  activeAccount: Account | undefined;
  contract: Readonly<ContractOptions<[], `0x${string}`>> | undefined;
  createCampaign: (
    form: CampaignForm
  ) => Promise<TransactionReceipt | undefined>;
  isContractLoaded: boolean;
}

export interface CampaignForm {
  title: string;
  description: string;
  target: bigint;
  deadline: number;
  image: string;
  name?: string;
}

export interface CampaignData {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
  donors: string[];
  donations: bigint[];
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function useStateContext() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
}

export function StateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeAccount = useActiveAccount();
  const [contract, setContract] =
    useState<Readonly<ContractOptions<[], `0x${string}`>>>();
  const [isContractLoaded, setIsContractLoaded] = useState(false);

  useEffect(() => {
    const getContractInstance = async () => {
      try {
        const contractInstance = await getContract({
          client,
          address: import.meta.env.VITE_CONTRACT_ADDRESS,
          chain: sepolia,
        });
        setContract(contractInstance);
        if (!contractInstance.address) {
          throw new Error("Unable to fetch contract Instance from thirdweb");
        } else {
          setIsContractLoaded((prevState) => true);
        }
      } catch (error: any) {
        console.error("Failed to get contract instance: ", error?.message);
      }
    };
    getContractInstance();
  }, []);

  async function createCampaign(form: CampaignForm) {
    if (!contract) throw new Error("Contract must be defined");

    const tx = prepareContractCall({
      contract: contract,
      method:
        "function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)",
      params: [
        activeAccount?.address ??
          (() => {
            throw new Error("Active account address is undefined");
          })(),
        form.title,
        form.description,
        BigInt(form.target),
        BigInt(form.deadline),
        form.image,
      ],
    });

    try {
      const transactionReceipt = await sendAndConfirmTransaction({
        account:
          activeAccount ??
          (() => {
            throw new Error("Active account is undefined");
          })(),
        transaction: tx,
      });
      return transactionReceipt;
    } catch (error: any) {
      console.error("Error creating campaign: ", error.message);
    }
  }

  return (
    <StateContext.Provider
      value={{ activeAccount, contract, createCampaign, isContractLoaded }}
    >
      {children}
    </StateContext.Provider>
  );
}
