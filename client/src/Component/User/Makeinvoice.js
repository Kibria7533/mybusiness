import Axios from "axios";
import React, { Component } from "react";
import URL from "./Url";
import Moment from "react-moment";
export default class Makeinvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleorder: [],
    };
  }
  getorder = () => {
    Axios.get(`${URL}/getsingleorder?orderid=${this.props.orderid}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        auth: localStorage.getItem("auth"),
      },
    }).then((item) => {
      console.log(item.data);
      this.setState({ singleorder: item.data });
    });
  };

  componentDidMount() {
    console.log(this.props.orderid);
    this.getorder();
  }
  render() {
    return (
      <div id="invoice">
        <div className="invoice overflow-auto">
          <div style={{ minWidth: "600px" }}>
            <header>
              <div className="row">
                <div className="col">
                  <a target="_blank" href="#">
                    <h2>Wellcom</h2>
                  </a>
                </div>
                <div className="col company-details">
                  <h2 className="name">
                    <a target="_blank" href="#">
                      BuyForest
                    </a>
                  </h2>
                  <div>Banani,Dhaka</div>
                  <div>01320778658</div>
                  <div>buyforestclub@gmail.com</div>
                </div>
              </div>
            </header>
            <main>
              <div className="row contacts">
                <div className="col invoice-to">
                  <div className="text-gray-light">INVOICE TO:</div>
                  <h2 className="to">{localStorage.getItem("username")}</h2>
                  <div className="address">
                    {this.state.singleorder.map((data, index) => {
                      return (
                        <>
                          {data.address.address},{data.address.city},
                          {data.address.state},,{data.address.zip}
                        </>
                      );
                    })}
                    ,BD
                  </div>
                  <div className="email">
                    <a href="mailto:john@example.com">
                      {this.state.singleorder.map((data, index) => {
                        return <>{data.address.email}</>;
                      })}
                    </a>
                  </div>
                </div>
                {this.state.singleorder.map((item, index) => {
                  return (
                    <div key={index} className="col invoice-details">
                      <h3 className="invoice-id">INVOICE ID={item.orderid}</h3>
                      <div className="date">
                        Date of Invoice:<Moment>{item.createdAt}</Moment>
                      </div>
                    </div>
                  );
                })}
              </div>

              <table border={0} cellSpacing={0} cellPadding={0}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-left">Products</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.singleorder.map((item, index) => {
                    return (
                      <>
                        {item.products.map((it, index) => {
                          return (
                            <tr>
                              <td className="no">{index + 1}</td>
                              <td className="text-left">
                                <h3>
                                  <a target="">{it.title}</a>
                                </h3>
                                <a target="">{it.brand}</a>
                                {it.category}
                              </td>
                              <td className="unit">${it.price}</td>
                              <td className="qty">{it.quantity}</td>
                              <td className="total">
                                ${it.price * it.quantity}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    );
                  })}
                </tbody>
                {this.state.singleorder.map((item, index) => {
                  return (
                    <tfoot key={index}>
                      <tr>
                        <td colSpan={2} />
                        <td colSpan={2}>SUBTOTAL</td>
                        <td>${item.total}</td>
                      </tr>
                      <tr>
                        <td colSpan={2} />
                        <td colSpan={2}>TAX 0%</td>
                        <td>$0.0</td>
                      </tr>
                      <tr>
                        <td colSpan={2} />
                        <td colSpan={2}>GRAND TOTAL</td>
                        <td>${item.total}</td>
                      </tr>
                    </tfoot>
                  );
                })}
              </table>

              <div className="notices">
                <div>NOTICE:</div>
                <div className="notice">
                  A finance charge of 1.5% will be made on unpaid balances after
                  30 days.
                </div>
              </div>
            </main>
            <footer>
              Invoice was created on a computer and is valid without the
              signature and seal.
            </footer>
          </div>
          {/*DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom*/}
          <div />
        </div>
      </div>
    );
  }
}
