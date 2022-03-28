import React, { Component } from "react";
import Modal from "react-modal";
import AccountListItem from "./AccountListItem";
import { Dropdown } from "react-bootstrap";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "#eeeeee",
    backgroundColor: "#333333",
    width: "400px",
    height: "400px",
  },
};

class AccountSelectionModal extends Component {
  render() {
    return (
      <Modal
        style={customStyles}
        isOpen={!this.props.accountIsSelected}
        onRequestClose={this.props.closeAccountSelectionModal}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <div className="centered">
          <ul className="accountListContainer">
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
                  {"Select Account"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="account-dropdown">
                  {this.props.accounts.map((account, index) => (
                    <div
                      key={index}
                      onClick={() => this.props.handler(account)}
                    >
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
      </Modal>
    );
  }
}

export default AccountSelectionModal;
