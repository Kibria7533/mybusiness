import React, { Component } from "react";
import axios from "axios";
import URL from "./Url";

import Invoice from "./Invoice";
import Moment from "react-moment";
export default class Customerorderlist extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${URL}/getuserorder`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
      })
      .then((res) => {
        this.setState({ orders: res.data });
      });
  }

  render() {
    return (
      <div className="p-4">
        <h3>Order Tracking</h3>
        <table className="table">
          <thead>
            <th>S No</th>
            <th>Order Id</th>
            <th>Status</th>

            <th>Date/Time</th>
            <th>Invoices</th>
            <th>Order Details</th>
          </thead>
          <tbody>
            {this.state.orders.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Order Id">#{item.orderid}</td>
                  {item.orderstatus == 1 && (
                    <td data-label="Status">
                      <button>pending</button>
                    </td>
                  )}
                  {item.orderstatus == 2 && (
                    <td data-label="Status">
                      <button>accepted</button>
                    </td>
                  )}
                  {item.orderstatus == 3 && (
                    <td data-label="Status">
                      <button>on the way</button>
                    </td>
                  )}
                  {item.orderstatus == 4 && (
                    <td data-label="Status">
                      <button>completed</button>
                    </td>
                  )}

                  <td data-label="Date/Time">
                    <Moment>{item.createdAt}</Moment>
                  </td>
                  <td data-label="Invoices">
                    <a href={`/invoice/${item.orderid}`}>
                      <button>print/save</button>
                    </a>
                  </td>
                  <td data-label="Order Details">
                    <a href={`/customerordertable/${item.orderid}`}>
                      <button>check</button>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <table class="table">
     <thead>
     	 <th>S.No</th>
     	 <th>Name</th>
     	 <th>Age</th>
     	 <th>Marks%</th>
     	 <th>Status</th>
     </thead>
     <tbody>
     	  <tr>
     	  	  <td data-label="S.No">1</td>
     	  	  <td data-label="Name">Dinesh</td>
     	  	  <td data-label="Age">34</td>
     	  	  <td data-label="Marks%">50%</td>
     	  	  <td data-label="Staus">Passed</td>
     	  </tr>

     	  <tr>
     	  	  <td data-label="S.No">2</td>
     	  	  <td data-label="Name">Kamal</td>
     	  	  <td data-label="Age">23</td>
     	  	  <td data-label="Marks%">70%</td>
     	  	  <td data-label="Staus">Passed</td>
     	  </tr>

     	  <tr>
     	  	  <td data-label="S.No">3</td>
     	  	  <td data-label="Name">Neha</td>
     	  	  <td data-label="Age">20</td>
     	  	  <td data-label="Marks%">90%</td>
     	  	  <td data-label="Staus">Passed</td>
     	  </tr>

     	  <tr>
     	  	  <td data-label="S.No">4</td>
     	  	  <td data-label="Name">Priya</td>
     	  	  <td data-label="Age">30</td>
     	  	  <td data-label="Marks%">30%</td>
     	  	  <td data-label="Staus">Failed</td>
     	  </tr>
     </tbody>
   </table> */}
      </div>
    );
  }
}
