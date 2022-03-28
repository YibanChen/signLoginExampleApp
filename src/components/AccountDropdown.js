import React, { Component } from "react";
import Identicon from "@polkadot/react-identicon";
import AccountListItem from "./AccountListItem";
import { Dropdown } from "react-bootstrap";
import "./style.css";
class AccountSelectionModal extends Component {
  constructor() {
    super();
    this.state = {
      selectedAccount: "",
    };
  }
  render() {
    const accountIdenticon = (
      <div className="centered">
        <Identicon
          className="my-class"
          value={
            !!JSON.parse(localStorage.getItem("currentAccount"))
              ? JSON.parse(localStorage.getItem("currentAccount")).address
              : ""
          }
          size={48}
          theme={"polkadot"}
        />
        {/* {JSON.parse(localStorage.getItem("currentAccount")).meta.name} */}
      </div>
    );
    return (
      <div className="mr-4">
        <ul className="accountListContainer mr-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Dropdown className="centered" variant="success">
              <Dropdown.Toggle
                style={{ backgroundColor: "#F19135", border: "#F19135" }}
              >
                {JSON.parse(localStorage.getItem("currentAccount")) !== ""
                  ? accountIdenticon
                  : "Select Account"}
              </Dropdown.Toggle>

              <Dropdown.Menu className="account-dropdown">
                {this.props.accounts.map((account, index) => (
                  <div key={index} onClick={() => this.props.handler(account)}>
                    <Dropdown.Item>
                      <AccountListItem account={account}></AccountListItem>
                    </Dropdown.Item>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </ul>
      </div>
    );
  }
}

export default AccountSelectionModal;
