import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import URL from "../User/Url";
import axios from "axios";
import Moment from "react-moment";
import Dropdown from "react-bootstrap/Dropdown";
class Manageusers extends Component {
  state = {
    users: [],
    loding: false,
  };

  fetchuser = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/api/users/getalluser`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
      })
      .then((data) => {
        console.log("uuu", data);
        if (data.data.length) {
          // console.log(data.data);
          this.setState({ users: data.data, loding: false, redirect: true });
        } else {
          this.setState({ users: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        this.setState({ loding: false });
      });
  };
  remove = async (id) => {
    await axios
      .get(
        `${URL}/api/users/deleteuser/${id}`,

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
  componentDidMount() {
    this.fetchuser();
  }
  render() {
    return (
      <div className="container-fluid">
        <h1 className="mt-4">All activate User here</h1>

        <table className="table">
          <thead>
            <th>S No</th>
            <th>Name</th>

            <th>Email</th>
            <th>Address</th>
            <th>Mobile</th>

            <th>Member SInce</th>
            <th>Action</th>
          </thead>
          <tbody>
            {this.state.users.map((data, index) => {
              return (
                <tr key={index}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Name">{data.fullname}</td>
                  <td data-label="Email">{data.email}</td>
                  <td data-label="Address">{data.address}</td>
                  <td data-label="Mobile">{data.mobile}</td>

                  <td data-label="Member SInce">
                    <Moment>{data.createdAt}</Moment>
                  </td>
                  <td data-label="Action">
                    <button type="button" onClick={() => this.remove(data._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Manageusers;
