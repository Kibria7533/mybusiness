import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import URL from "./Url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Contact extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      phonenumber: "",
      email: "",
      messege: "",
      error: "",
    };
  }
  notify = () => toast.error(this.state.error);
  savetostate = async (data) => {
    const name = data.target.name;
    const value = data.target.value;
    this.setState({ [name]: value });
  };
  sub = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${URL}/api/users/contactmessege`,
        {
          fullname: this.state.fullname,
          phonenumber: this.state.phonenumber,
          email: this.state.email,
          messege: this.state.messege,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            auth: localStorage.getItem("auth"),
          },
        }
      )
      .then((re) => {
        console.log("ppp", re);
        if (re.data.messege.success) {
          this.setState({ loding: false, redirect: true });
          this.setState({
            messege: "",
            phonenumber: "",
            fullname: "",
            error: "Gmail send succefully",
          });
          this.notify();
        }

        if (!re.data.messege.success) {
          this.setState({ error: re.data.messege.msg });
          this.notify();
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message.msg)
        // this.setState({ error: err.response.data.errors[0].msg, loding: false })
        //  this.notify();

        // console.log(err)

        console.log("eee", err);
      });
  };
  render() {
    return (
      <div>
        <div className="contact-main">
          <div className="container">
            {/* Content Row */}
            <div className="row">
              {/* Map Column */}
              <div className="col-lg-8 mb-4 contact-left">
                <h3>Send us a Message</h3>
                <form
                  name="sentMessage"
                  onSubmit={this.sub}
                  id="contactForm"
                  noValidate
                >
                  <div className="control-group form-group">
                    <div className="controls">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control"
                        id="name"
                        required
                        name="fullname"
                        onChange={this.savetostate}
                        value={this.state.fullname}
                        data-validation-required-message="Please enter your name."
                      />
                      <p className="help-block" />
                    </div>
                  </div>
                  <div className="control-group form-group">
                    <div className="controls">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="form-control"
                        id="phone"
                        name="phonenumber"
                        value={this.state.phonenumber}
                        onChange={this.savetostate}
                        required
                        data-validation-required-message="Please enter your phone number."
                      />
                    </div>
                  </div>
                  <div className="control-group form-group">
                    <div className="controls">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="form-control"
                        id="email"
                        required
                        name="email"
                        value={this.state.email}
                        onChange={this.savetostate}
                        data-validation-required-message="Please enter your email address."
                      />
                    </div>
                  </div>
                  <div className="control-group form-group">
                    <div className="controls">
                      <textarea
                        rows={5}
                        cols={100}
                        placeholder="Message"
                        className="form-control"
                        id="message"
                        required
                        value={this.state.messege}
                        name="messege"
                        onChange={this.savetostate}
                        data-validation-required-message="Please enter your message"
                        maxLength={999}
                        style={{ resize: "none" }}
                      />
                    </div>
                  </div>
                  <div id="success" />
                  {/* For success/fail messages */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="sendMessageButton"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              {/* Contact Details Column */}
              <div className="col-lg-4 mb-4 contact-right">
                <h3>Contact Details</h3>
                <p>
                  Banani
                  <br />
                  Dhaka
                  <br />
                </p>
                <p>
                  <abbr title="Phone">P</abbr>: 01320778658
                </p>
                <p>
                  <abbr title="Email">E</abbr>:
                  <a href="mailto:buyforestclub@gmail.com">
                    {" "}
                    buyforestclub@gmail.com{" "}
                  </a>
                </p>
                <p>
                  <abbr title="Hours">H</abbr>: Monday - Friday: 9:00 AM to 5:00
                  PM
                </p>
              </div>
            </div>
            {/* /.row */}
          </div>
          {/* /.container */}
        </div>
        <div className="map-main">
          {/* Embedded Google Map */}
          <iframe
            width="100%"
            height="300px"
            frameBorder={0}
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="http://maps.google.com/maps?hl=en&ie=UTF8&ll=37.0625,-95.677068&spn=56.506174,79.013672&t=m&z=4&output=embed"
          />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default Contact;
