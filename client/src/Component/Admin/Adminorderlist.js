import React, { Component } from "react";
import axios from "axios";
import URL from "../User/Url";

import Invoice from "../User/Invoice";
import Moment from "react-moment";
import { Navbar, Nav, NavDropdown, Row } from "react-bootstrap";
import { BrowserRouter, Switch, NavLink, Route, Link } from "react-router-dom";
export default class Adminorderlist extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${URL}/getallorder`, {
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
  remove = async (id) => {
    await axios
      .get(
        `${URL}/deleteorders/${id}`,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            auth: localStorage.getItem("auth"),
          },
        }
      )
      .then((data) => {
        console.log("uuu", data.data);
        this.componentDidMount();
        // if (data.data.length) {
        //   this.setState({ withdraw: data.data, loding: false, redirect: true });
        // }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ error: err.response.data.messege.msg, loding: false })
      });
  };
  statuschange = async (status, id) => {
    await axios
      .post(
        `${URL}/statusset`,
        { status, id },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            auth: localStorage.getItem("auth"),
          },
        }
      )
      .then((data) => {
        console.log("uuu", data.data);
        this.componentDidMount();
        // if (data.data.length) {
        //   this.setState({ withdraw: data.data, loding: false, redirect: true });
        // }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ error: err.response.data.messege.msg, loding: false })
      });
  };
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
            <th>Actions</th>
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
                  <td data-label="Actions">
                    <button type="button" onClick={() => this.remove(item._id)}>
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    /
                    <NavDropdown>
                      <NavDropdown.Item
                        onClick={() => this.statuschange(1, item._id)}
                      >
                        Pending
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => this.statuschange(2, item._id)}
                      >
                        Accepted
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => this.statuschange(3, item._id)}
                      >
                        On the way
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => this.statuschange(4, item._id)}
                      >
                        Completed
                      </NavDropdown.Item>
                    </NavDropdown>
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
