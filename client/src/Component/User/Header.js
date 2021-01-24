import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import FlatList from "flatlist-react";
import Leftsidenavigation from "./Leftsidenavigation";
import Rightsidenavigation from "./Rightsidenavigation";
import Avatar from "react-avatar";
import URL from "./Url";
import { withRouter } from "react-router-dom";
import SearchBox from "react-responsive-searchbox/lib/SearchBox";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showstate: false,
      clicked: "",
      open: false,
      opensidebar: false,
      data: [],
      megadata: [],
      sidemenudata: [],
      auth: false,
      username: "",
      admin: false,
    };
  }

  openrightcanvas = () => {
    this.setState({ open: !this.state.open });
  };
  setOpenhandeler = () => {
    this.setState({ open: !this.state.open });
  };
  handleSidebar = () => {
    this.setState({ opensidebar: !this.state.opensidebar });
  };
  megamenuhandel = (data) => {
    {
      this.state.data.map((item) => {
        if (
          item.CategoryName === data &&
          item.SubCategory.length &&
          this.state.clicked === item.CategoryName
        ) {
          this.setState({
            megadata: item.SubCategory,
            showstate: !this.state.showstate,
            clicked: item.CategoryName,
          });
        } else if (
          item.CategoryName === data &&
          item.SubCategory.length &&
          this.state.clicked != item.CategoryName
        ) {
          this.setState({
            megadata: item.SubCategory,
            showstate: true,
            clicked: item.CategoryName,
          });
        } else if (item.CategoryName === data && !item.SubCategory.length) {
          this.setState({ megadata: [], showstate: !this.state.showstate });
        }
      });
    }
  };
  async componentDidMount() {
    const token = localStorage.getItem("auth");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("userrole");

    if (token && role === "admin") {
      this.setState({ admin: true });
    }

    if (token) {
      this.setState({ auth: true, username: username });
    } else {
      this.setState({ auth: false, username: "" });
    }

    await axios
      .get(`${URL}/getmenus`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        this.setState({ data: data.data });

        const mydata = data.data.map((item, index) => {
          if (!item.SubCategory.length) {
            var info = {
              content: [
                {
                  id: index,
                  name: item.CategoryName,
                  to: `/${item.CategoryName}`,
                },
              ],
            };
            return info;
          } else {
            var children = new Array();
            item.SubCategory.map((sub, index) => {
              var sub = {
                content: [{ id: index, name: sub.Name, to: `/${sub.Name}` }],
              };
              children.push(sub);
            });
            var info = {
              content: [
                { id: index, name: item.CategoryName, children: children },
              ],
            };
            return info;
          }
        });
        this.setState({ sidemenudata: mydata });
        //   console.log(mydata)
      });
  }

  renderPerson = (person, idx) => {
    return (
      <li key={idx} className="list-unstyled">
        <a href={`/${person.Name}`}>{person.Name} </a>
      </li>
    );
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Leftsidenavigation
            sidemenudata={this.state.sidemenudata}
            open={this.state.opensidebar}
          />
          <Rightsidenavigation
            style={{ color: "red" }}
            open={this.state.open}
            setOpen={this.setOpenhandeler}
          />
          <div className="desktopnav you">
            {this.state.showstate && (
              <ul style={{ marginTop: "40px" }}>
                <FlatList
                  list={this.state.megadata}
                  renderItem={this.renderPerson}
                  renderWhenEmpty={() => (
                    <div>You didn't add any category yet</div>
                  )}
                  display={{
                    grid: true,
                    minColumnWidth: "10px",
                    gridGap: "5px",
                  }}
                />
              </ul>
            )}
          </div>
          <nav className="desktopnav navbar navbar-expand-sm navbar-dark  bg-dark fixed-top">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                BuyForest
              </a>

              <div>
                <ul className="navbar-nav ml-auto ">
                  {this.state.data.map((item, index) => {
                    if (item.Type === "megamenu") {
                      return (
                        <li
                          key={index}
                          className="nav-item dropdown has-megamenu"
                        >
                          <a
                            className="nav-link dropdown-toggle"
                            id="my"
                            href="#"
                            on
                            onClick={() =>
                              this.megamenuhandel(item.CategoryName)
                            }
                          >
                            {item.CategoryName}
                          </a>
                        </li>
                      );
                    } else if (item.Type === "dropdownmenu") {
                      return (
                        <li key={index} className="nav-item dropdown">
                          <a
                            className="nav-link  dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            {item.CategoryName}{" "}
                          </a>
                          <ul className="dropdown-menu dropdown-menu-right">
                            {item.SubCategory.map((sub, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    className="dropdown-item"
                                    href={`/${sub.Name}`}
                                  >
                                    {sub.Name}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    } else {
                      return (
                        <li key={index} className="nav-item">
                          <a
                            className="nav-link"
                            href={`/${item.CategoryName}`}
                          >
                            {item.CategoryName}
                          </a>
                        </li>
                      );
                    }
                  })}
                  <li>
                    <a href="/wishlist">
                      {" "}
                      <i
                        className="fa fa-heart"
                        style={{
                          fontSize: "24px",
                          margin: "5px",
                          color: "red",
                        }}
                      ></i>
                    </a>
                    <span className="badge badge-warning" id="lblCartCount">
                      {this.props.wishlistnumber}{" "}
                    </span>
                  </li>
                  <li>
                    <a href="/cart">
                      {" "}
                      <i
                        className="fa"
                        style={{
                          fontSize: "24px",
                          margin: "5px",
                          color: "orange",
                        }}
                      >
                        &#xf07a;
                      </i>
                    </a>
                    <span className="badge badge-warning" id="lblCartCount">
                      {" "}
                      {this.props.addtocart}
                    </span>
                  </li>
                  {this.state.auth ? (
                    <li>
                      <Avatar
                        name={this.state.username}
                        size="30"
                        style={{ paddingTop: "8px" }}
                        onClick={this.openrightcanvas}
                        maxInitials={1}
                        round
                        textSizeRatio={2.75}
                      />
                    </li>
                  ) : (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link  dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li>
                          <a className="dropdown-item" href="/userregister">
                            Register
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/userlogin">
                            Login
                          </a>
                        </li>
                      </ul>
                    </li>
                  )}
                  {this.state.admin && (
                    <li className="nav-item">
                      <a className="nav-link" href="/admindashboard">
                        <i
                          className="fa fa-home"
                          style={{ fontSize: "28px", color: "blue" }}
                        ></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
          <div className="mobilenav  justify-content-between bg-secondary fixed-top">
            <div style={{ marginTop: "27px", paddingLeft: "5px" }}>
              {" "}
              <button type="button" onClick={this.handleSidebar}>
                <span className="navbar-toggler-icon"></span>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-align-end"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z" />
                  <path d="M13 7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" />
                </svg>
              </button>
            </div>

            <div className="bg-warning">
              <a
                className="navbar-brand"
                href="/wishlist"
                style={{ margin: "10px" }}
              >
                MAD_ECOM
              </a>
            </div>
            <div>
              <i
                className="fa fa-heart"
                style={{ fontSize: "20px", color: "red", marginTop: "39px" }}
              ></i>
              <span
                className="badge badge-warning"
                id="lblCartCount"
                style={{ marginTop: "33px" }}
              >
                {this.props.wishlistnumber}{" "}
              </span>
            </div>
            <div>
              <a href="/cart">
                {" "}
                <i
                  className="fa"
                  style={{
                    fontSize: "20px",
                    color: "orange",
                    marginTop: "39px",
                  }}
                >
                  &#xf07a;
                </i>
              </a>
              <span
                className="badge badge-warning"
                id="lblCartCount"
                style={{ marginTop: "33px" }}
              >
                {this.props.addtocart}
              </span>
            </div>
            <div style={{ marginTop: "27px", paddingLeft: "5px" }}>
              {this.state.auth ? (
                <Avatar
                  name={this.state.username}
                  size="30"
                  style={{ paddingTop: "8px" }}
                  onClick={this.openrightcanvas}
                  maxInitials={1}
                  round
                  textSizeRatio={2.75}
                />
              ) : (
                <li className="nav-item dropdown list-unstyled">
                  <a
                    className="nav-link  dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i
                      className="fa fa-user-circle-o"
                      style={{ fontSize: "30px" }}
                      aria-hidden="true"
                    ></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <a className="dropdown-item" href="/userregister">
                        Register
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/userlogin">
                        Login
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              {this.state.admin && (
                <a
                  className="nav-link"
                  href="/admindashboard"
                  style={{ marginTop: "-34px", marginLeft: "22px" }}
                >
                  <i
                    className="fa fa-home"
                    style={{ fontSize: "28px", color: "blue" }}
                  ></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default withRouter(Header);
