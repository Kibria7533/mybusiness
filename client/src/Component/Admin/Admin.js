import React, { Component } from "react";
import { BrowserRouter, Switch, NavLink, Route, Link } from "react-router-dom";
import Adminbody from "./Adminbody";
import Adminsidebar from "./Adminsidebar";
import Manageusers from "./Manageusers";
import Menumanage from "./Menumanage";
import Uploadproduct from "./Uploadproduct";
import { Navbar, Nav, NavDropdown, Row } from "react-bootstrap";
import Manageproducts from "./Manageproducts";
import Adminproductshow from "./Adminproductshow";
import Adminorderlist from "./Adminorderlist";
class Admin extends Component {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
      handleSidebar: false,
    };
  }
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <div className="sidebar desktopnav">
            <Link className="active" to="/">
              Home
            </Link>

            <NavDropdown
              id="basic-nav-dropdown"
              style={{ marginRight: "120px" }}
              title="Manage Products"
            >
              <NavDropdown.Item href="#action/3.1">
                <NavLink
                  className="nav-link"
                  to="/admindashboard/uploadproduct"
                >
                  Add Products
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <NavLink className="nav-link" to="/admindashboard/products">
                  Edit Products
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              id="basic-nav-dropdown"
              style={{ marginRight: "120px" }}
              title="Manage Users"
            >
              <NavDropdown.Item href="#action/3.1">
                <NavLink className="nav-link" to="/admindashboard/users">
                  All active Users
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>

            <Link to="/admindashboard/menus">Manage Menus</Link>
            <Link to="/admindashboard/adminorders">Manage Orders</Link>
          </div>
          <div className="sidebar mobilenav" style={{ paddingLeft: "100px" }}>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="/admindashboard/menus">Manage Menus</a>
          </div>
          <div className="row">
            <div className="mobilenav">
              <Adminsidebar thishandleSidebar={this.state.handleSidebar} />
            </div>
          </div>

          <div className="content">
            <Switch>
              <Route exact path="/admindashboard" component={Adminbody} />
              <Route
                exact
                path="/admindashboard/menus"
                component={Menumanage}
              />
              <Route
                exact
                path="/admindashboard/users"
                component={Manageusers}
              />
              <Route
                exact
                path="/admindashboard/uploadproduct"
                component={Uploadproduct}
              />
              <Route
                exact
                path="/admindashboard/products"
                component={Manageproducts}
              />
              <Route
                exact
                path="/admindashboard/adminorders"
                component={Adminorderlist}
              />

              <Route
                exact
                path="/admindashboard/singleproduct/:productId"
                render={(props) => <Adminproductshow {...props} />}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Admin;
