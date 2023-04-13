import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadcontract } from "./utils/loadContract";

const App = () => {
  const [web3Api,  setweb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [Balance, setBalance] = useState(null);
  const [Account, setAccount] = useState(null);
  const [reload, setReload] = useState(false);
 
  const reloadEffect = () => {
    setReload(!reload);
  };

  //USING PACKAGE FOR LESS LINE OF CODE
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      //Here the instance of the contract has been created
      const contract = await loadcontract("Funding", provider); 

      if (provider) {
        provider.request({ method: "eth_requestAccounts" });

        setweb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.error("Please install MetaMask");
      }
    };
    loadProvider();
    reloadEffect();
  }, []);

  const transferFund = async () => {
    const { web3, contract } = web3Api;
    await contract.transfer({
      from: Account,
      value: web3.utils.toWei("0.00000002", "ether"),
    });
    reloadEffect();
  };

  const WithdrawAmount = async () => {
    const { web3, contract } = web3Api;
    const amount = await web3.utils.toWei("0.00000002", "ether");
    await contract.withdraw(amount, {
      from: Account,
    });
    reloadEffect();
  };

  

  useEffect(() => {
    const getbalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(balance);
    };
    web3Api.contract && getbalance(); //if web3api.web3 presents then only call getaccounts
  }, [web3Api, reload]);

  useEffect(() => {
    const getaccount = async () => {
      const account = await web3Api.web3.eth.getAccounts();
      setAccount(account[0]);
    };
    web3Api.web3 && getaccount(); //if web3api.web3 presents then only call getaccounts
  }, [web3Api.web3, reload]);

  return (
    <>
      <div className="container-fluid  vh-100 d-flex align-items-center justify-content-center bg-gradient ">
        <div className="card text-center bg-gray w-70 rounded-3 border-0 shadow-lg">
          <div className="text-dark card-header text-uppercase fw-bold  bg-gradient text-light py-3 ">
            Funding
          </div>
          <div className="card-body">
            <p className="card-text mb-4 fw-bold  ">
              Account: {Account ? Account : "Connect to MetaMask"}
            </p>
            <h5 className="card-title mb-4">Contract Balance: {Balance} wei</h5>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-primary btn-lg me-sm-3 mb-3 mb-sm-0"
                onClick={transferFund}
              >
                Transfer
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg hover"
                onClick={WithdrawAmount}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="card-footer text-muted fw-bold bg-gradient text-light py-3">
            A decentralized application that lets you transfer and withdraw
            funds within the contract using MetaMask,  the funds are stored within the contract itself, and can be withdrawn as needed.
          </div>
          <div className="card-footer text-muted fw-bold bg-gradient text-light py-3">
          A DAPP for smooth, seamless flow of funds between the user's wallet and the contract.
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

//USING IF ELSE STATEMENT TO DETECT ETHEREUM
// useEffect(() => {
//   const loadProvider = async () => {
//     // console.log(window.web3);
//     // console.log(window.ethereum);

//     let provider = null;
//     if (window.ethereum) {
//       provider = window.ethereum;
//       try {
//         await provider.enable();
//       }
//       catch {
//         console.error("this  is  error");
//       }
//     } else if (window.web3) {
//       provider = window.web3.currentProvider;
//     } else if (!process.evm.production) {
//       //The process object is a global object in Node.js that provides information about the current Node.js process.
//       provider = new Web3.providers.HttpProvider("http://localhost:7545");
//     }

//     //once we create a new instance of the Web3 object with the provider object, we can use the Web3 library to interact with the Ethereum blockchain through the provider object

//     setweb3Api({
//       web3: new Web3(provider),  //creating new instance with the provider so that we can use the Web3 library to interact with the Ethereum blockchain through the provider object.
//       provider: provider
//     })
//   };
//   loadProvider();
// }, []);

// console.log(web3Api.web3)
