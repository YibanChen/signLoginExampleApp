import React from "react";
import Button from "react-bootstrap/Button";

import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import AccountSelectionModal from "../components/AccountSelectionModal";
import PromptExtensionInstallModal from "../components/PromptExtensionInstallModal";
import { LoginButton } from "yibanchen-react-login";

class SignDemo extends React.Component {
  constructor() {
    super();

    this.dataToSign = "data to be signed";

    const savedAccount = JSON.parse(localStorage.getItem("currentAccount"))
      ? JSON.parse(localStorage.getItem("currentAccount"))
      : "";
    let accountSelected;

    if (savedAccount) {
      this.setState({
        selectedAccount: savedAccount,
      });
      accountSelected = true;
    } else {
      accountSelected = false;
    }

    this.state = {
      messageData: "",
      selectedAccount: savedAccount,
      accounts: [],
      dataWasVerified: false,
      verificationAttempted: false,
      accountIsSelected: accountSelected,
      extensionIsInstalled: true,
      dataWasSigned: false,
    };
  }

  handler = (acc) => {
    this.setState({
      selectedAccount: acc,
    });

    localStorage.setItem("currentAccount", JSON.stringify(acc));

    this.closeAccountSelectionModal();
  };

  closeAccountSelectionModal = () => {
    this.setState({ accountIsSelected: true });
    window.location.reload();
  };

  openAccountSelectionModal = () => {
    this.setState({ accountIsSelected: false });
  };

  setSignedData = (signedData) => {
    this.setState({ dataWasSigned: true });
    let accountsThatLoggedIn = JSON.parse(
      localStorage.getItem("accountsThatLoggedIn")
    );
    let accountSignedValuePairs = JSON.parse(
      localStorage.getItem("accountSignedValuePairs")
    );
    if (!accountsThatLoggedIn) {
      accountsThatLoggedIn = [];
    }
    if (!accountSignedValuePairs) {
      accountSignedValuePairs = [];
    }
    let addressSignedValuePair = {
      address: this.state.selectedAccount.address,
      signedData: signedData,
    };
    accountsThatLoggedIn.push(this.state.selectedAccount.address);
    accountSignedValuePairs.push(addressSignedValuePair);
    localStorage.setItem(
      "accountsThatLoggedIn",
      JSON.stringify(accountsThatLoggedIn)
    );
    localStorage.setItem(
      "accountSignedValuePairs",
      JSON.stringify(accountSignedValuePairs)
    );
  };

  determineIfFirstTimeLogin = (walletAddress) => {
    let accountsThatLoggedIn = JSON.parse(
      localStorage.getItem("accountsThatLoggedIn")
    );
    if (!accountsThatLoggedIn) {
      accountsThatLoggedIn = [];
    }
    for (const address of accountsThatLoggedIn) {
      if (address === walletAddress) {
        return false;
      }
    }
    return true;
  };

  findSignedData = () => {
    let accountSignedValuePairs = JSON.parse(
      localStorage.getItem("accountSignedValuePairs")
    );
    if (!accountSignedValuePairs) {
      accountSignedValuePairs = [];
    }
    for (const pair of accountSignedValuePairs) {
      if (this.state.selectedAccount.address === pair["address"]) {
        return pair["signedData"];
      }
    }
  };

  componentDidMount = async () => {
    const extensions = await web3Enable("YibanChen");
    if (extensions.length === 0) {
      this.setState({ extensionIsInstalled: false });
    }
    const allAccounts = await web3Accounts();
    this.setState({ accounts: allAccounts });
  };

  render() {
    return (
      <div className="centered">
        <AccountSelectionModal
          accountIsSelected={this.state.accountIsSelected}
          closeAccountSelectionModal={this.closeAccountSelectionModal}
          accounts={this.state.accounts}
          handler={this.handler}
        ></AccountSelectionModal>
        <PromptExtensionInstallModal
          extensionIsInstalled={this.state.extensionIsInstalled}
          closeModal={this.closeModal}
        ></PromptExtensionInstallModal>
        <h1 className="m-3">YibanChen Login Demo</h1>

        <Button
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            backgroundColor: "#F19135",
            border: "#F19135",
          }}
          onClick={this.openAccountSelectionModal}
        >
          Switch Account
        </Button>
        <div className="ml-4">
          <LoginButton
            messageData={this.dataToSign}
            signedData={this.findSignedData()}
            walletAddress={this.state.selectedAccount.address}
            firstTimeLogin={this.determineIfFirstTimeLogin(
              this.state.selectedAccount.address
            )}
            handleSignedData={this.setSignedData}
            handleDataWasVerified={(data) => {
              this.setState({ dataWasVerified: data });
            }}
            handleVerificationAttempted={(data) => {
              this.setState({ verificationAttempted: data });
            }}
            buttonSize={"lg"}
            identiconTheme={"polkadot"}
            walletName={
              this.state.selectedAccount
                ? this.state.selectedAccount.meta.name
                : ""
            }
          ></LoginButton>
          <h5 className="m-2">
            {this.state.dataWasSigned
              ? "Data was signed! Account is logged in"
              : ""}
          </h5>
          <h5 className="m-2">
            {this.state.dataWasVerified
              ? "Data was verified! Account is logged in"
              : ""}
          </h5>
        </div>
      </div>
    );
  }
}

export default SignDemo;
