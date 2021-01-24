import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Cardcheckoutform from "./Cardcheckoutform";
import Axios from "axios";
import URL from "./Url";
import { text } from "body-parser";
export default class Ordersummery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      total: 0,
      orderid: "",
      paymenttype: "",
      transactionid: "",
      step: 1,
    };
  }
  onchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  postorder = async (variable) => {
    await Axios.post(`${URL}/ordersave`, variable, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        auth: localStorage.getItem("auth"),
      },
    })
      .then((res) => {
        console.log(res);
        this.props.history.push("/customerorderlist");
        this.props.cartempty();

        alert("order save & payment ok");
      })
      .catch((err) => {
        alert("Somthing Error happend");
      });
  };
  uniqueid = async () => {
    await axios
      .get(`${URL}/uniqueid`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
      })
      .then((data) => {
        // console.log(data.data);
        this.setState({ orderid: data.data });
      });
  };
  onSuc = () => {
    if (!this.state.paymenttype) return alert("Select a Payment Type ");

    if (!this.state.transactionid) return alert("Put Transaction Id");

    // Congratulation, it came here means everything's fine!
    console.log("The payment was succeeded!");
    this.uniqueid();
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    const variable = {
      address: this.state,
      orderid: this.state.orderid,
      paymenttype: this.state.paymenttype,
      paymentid: this.state.transactionid,
      products: this.props.cart,
      total: this.props.total,
    };
    this.postorder(variable);
  };

  onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    alert("Somethig went wrong");
    this.props.history.push("/ordersummery");
    console.log("The payment was cancelled!", data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    alert("Somethig went wrong");
    this.props.history.push("/ordersummery");
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };
  async componentDidMount() {
    this.setState({ total: this.props.total });
  }
  componentDidUpdate(pre) {
    if (this.props.total != pre.total) {
      this.setState({ total: parseInt(this.props.total) });
    }
  }
  env = "sandbox"; // you can set here to 'production' for production
  currency = "USD"; // or you can set this value from your props or state
  // total = {this.state.total} || 0; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
  // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

  client = {
    sandbox:
      "AfRPtsoxbVeHQfNEWVnXnkPYYSFe1FWY_9JTIRCoY3Vj-NBeosHQ81-YSXMSgPMV6xhNnlx4SSg4NLAd",
    production: "YOUR-PRODUCTION-APP-ID",
  };
  // In order to get production's app-ID, you will have to send your app to Paypal for approval first
  // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
  //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
  // For production app-ID:
  //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
  addresset = () => {
    const { firstname, email, address, city, state, zip } = this.state;
    if (!firstname || !email || !address || !city || !state || !zip) {
      return alert("Please fill all the field");
    } else {
      this.setState({ step: this.state.step + 1 });
    }
  };

  render() {
    return (
      <>
        {this.state.step == 1 && (
          <div
            className="row roww"
            style={{
              display: "-ms-flexbox",
              display: "flex",
              "-ms-flex-wrap": "wrap",
              flexWrap: "wrap",
              margin: "0 -16px",
              marginTop: "73px",
            }}
          >
            <div
              className="col-75"
              style={{
                "-ms-flex": "75%",
                flex: "75%",
                padding: " 0 16px",
              }}
            >
              <div
                className="container con"
                style={{
                  backgroundColor: " #f2f2f2",
                  padding: "5px 20px 15px 20px",
                  border: "1px solid lightgrey",
                  borderRadius: "3px",
                }}
              >
                <form>
                  <div
                    className="row"
                    style={{
                      display: "-ms-flexbox",
                      display: "flex",
                      "-ms-flex-wrap": "wrap",
                      flexWrap: "wrap",
                      margin: "0 -16px",
                    }}
                  >
                    <div
                      className="col-50"
                      style={{
                        "-ms-flex": "50%",
                        flex: "50%",
                        padding: " 0 16px",
                      }}
                    >
                      <h3>Billing Address</h3>
                      <label
                        style={{
                          marginBottom: "10px",
                          display: "block",
                        }}
                        htmlFor="fname"
                      >
                        <i className="fa fa-user" /> Full Name
                      </label>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                          padding: "12px",
                          border: "1px solid #ccc",
                          borderRadius: "3px",
                        }}
                        id="fname"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.onchange}
                        placeholder="John M. Doe"
                      />
                      <label
                        style={{
                          marginBottom: "10px",
                          display: "block",
                        }}
                        htmlFor="email"
                      >
                        <i className="fa fa-envelope" /> Email
                      </label>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                          padding: "12px",
                          border: "1px solid #ccc",
                          borderRadius: "3px",
                        }}
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onchange}
                        placeholder="john@example.com"
                      />
                      <label
                        style={{
                          marginBottom: "10px",
                          display: "block",
                        }}
                        htmlFor="adr"
                      >
                        <i className="fa fa-address-card-o" /> Address
                      </label>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                          padding: "12px",
                          border: "1px solid #ccc",
                          borderRadius: "3px",
                        }}
                        id="adr"
                        name="address"
                        value={this.state.address}
                        onChange={this.onchange}
                        placeholder="542 W. 15th Street"
                      />
                      <label
                        style={{
                          marginBottom: "10px",
                          display: "block",
                        }}
                        htmlFor="city"
                      >
                        <i className="fa fa-institution" /> City
                      </label>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                          padding: "12px",
                          border: "1px solid #ccc",
                          borderRadius: "3px",
                        }}
                        id="city"
                        name="city"
                        value={this.state.city}
                        onChange={this.onchange}
                        placeholder="New York"
                      />
                      <div
                        className="row"
                        style={{
                          display: "-ms-flexbox",
                          display: "flex",
                          "-ms-flex-wrap": "wrap",
                          flexWrap: "wrap",
                          margin: "0 -16px",
                        }}
                      >
                        <div
                          className="col-50"
                          style={{
                            "-ms-flex": "50%",
                            flex: "50%",
                            padding: " 0 16px",
                          }}
                        >
                          <label
                            style={{
                              marginBottom: "10px",
                              display: "block",
                            }}
                            htmlFor="state"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            style={{
                              width: "100%",
                              marginBottom: "20px",
                              padding: "12px",
                              border: "1px solid #ccc",
                              borderRadius: "3px",
                            }}
                            id="state"
                            name="state"
                            value={this.state.state}
                            onChange={this.onchange}
                            placeholder="NY"
                          />
                        </div>
                        <div
                          className="col-50"
                          style={{
                            "-ms-flex": "50%",
                            flex: "50%",
                            padding: " 0 16px",
                          }}
                        >
                          <label
                            style={{
                              marginBottom: "10px",
                              display: "block",
                            }}
                            htmlFor="zip"
                          >
                            Zip
                          </label>
                          <input
                            type="text"
                            style={{
                              width: "100%",
                              marginBottom: "20px",
                              padding: "12px",
                              border: "1px solid #ccc",
                              borderRadius: "3px",
                            }}
                            id="zip"
                            name="zip"
                            value={this.state.zip}
                            onChange={this.onchange}
                            placeholder={10001}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <label
                    style={{
                      marginBottom: "10px",
                      display: "block",
                    }}
                  >
                    <input
                      type="checkbox"
                      defaultChecked="checked"
                      name="sameadr"
                    />{" "}
                    Shipping address same as billing
                  </label>

                  <a onClick={this.addresset}>
                    {" "}
                    <input
                      type="button"
                      value="Place Order"
                      className="btn"
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "12px",
                        margin: "10px 0",
                        border: "none",
                        width: "100%",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "17px",
                      }}
                    />
                  </a>
                </form>
              </div>
            </div>
            <div
              className="col-25"
              style={{
                "-ms-flex": "25%",
                flex: "25%",
                padding: " 0 16px",
              }}
            >
              <div
                className="container"
                style={{
                  backgroundColor: " #f2f2f2",
                  padding: "5px 20px 15px 20px",
                  border: "1px solid lightgrey",
                  borderRadius: "3px",
                }}
              >
                <h4>
                  Cart
                  <span
                    className="price"
                    style={{ color: "black" }}
                    style={{
                      float: "right",
                      color: "grey",
                    }}
                  >
                    <i className="fa fa-shopping-cart" />
                    <b>{this.props.addtocart}</b>
                  </span>
                </h4>
                {this.props.cart.map((item, index) => {
                  return (
                    <p>
                      <a href="#">{item.title}</a>{" "}
                      <span
                        className="price"
                        style={{
                          float: "right",
                          color: "grey",
                        }}
                      >
                        ${item.price}
                      </span>
                    </p>
                  );
                })}

                <hr />
                <p>
                  Total{" "}
                  <span className="price" style={{ color: "black" }}>
                    <b>${this.props.total}</b>
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {this.state.step == 2 && (
          <div
            style={{
              backgroundColor: " #f2f2f2",
              padding: "5px 20px 15px 20px",
              border: "1px solid lightgrey",
              borderRadius: "3px",
              marginTop: "160px",
              textAlign: "center",
            }}
          >
            <div className="form-group">
              <div>
                <input
                  type="radio"
                  name="emotion"
                  id="sad"
                  className="input-hidden"
                  name="paymenttype"
                  onChange={this.onchange}
                  value="nogod"
                />
                <label for="sad">
                  <img
                    style={{ width: "151px" }}
                    src={`./images/nogodlogo.png`}
                    alt="I'm sad"
                  />
                </label>

                <input
                  type="radio"
                  name="emotion"
                  id="happy"
                  className="input-hidden"
                  name="paymenttype"
                  onChange={this.onchange}
                  value="roket"
                />
                <label for="happy" style={{ marginLeft: "15px" }}>
                  <img
                    style={{ width: "151px" }}
                    src={`./images/roketlogo.png`}
                    alt="I'm happy"
                  />
                </label>
                <input
                  type="radio"
                  name="emotion"
                  id="good"
                  className="input-hidden"
                  name="paymenttype"
                  onChange={this.onchange}
                  value="bikash"
                />
                <label for="good" style={{ marginLeft: "15px" }}>
                  <img
                    style={{ width: "151px" }}
                    src={`./images/bikashlogo.png`}
                    alt="I'm good"
                  />
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Payment Number</label>
              <h4 style={{ marginLeft: "20px" }}>: 01854563442</h4>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="transactionid"
                onChange={this.onchange}
                value={this.state.transactionid}
                className="form-control"
                placeholder="Your Transaction Id"
              />
            </div>
            <div className="form-group">
              <button type="button" onClick={this.onSuc}>
                Confirm
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
