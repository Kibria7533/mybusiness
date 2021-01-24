import React, { Component } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Cart from "./Cart";
import Cartdelete from "./Cartdelete";
import Homeuser from "./Homeuser";
import Header from "./Header";
import Footer from "./Footer";
import Userregister from "./Userregister";
import Userlogin from "./Userlogin";
import Logout from "./Logout";
import Adminlogin from "./Adminlogin";
import Forgotpassword from "./Forgotpassword";
import Showmessege from "./Showmessege";
import Changepassword from "./Changepassword";
import Singleproducts from "./Singleproducts";
import Axios from "axios";
import URL from "./Url";
import Ordersummery from "./Ordersummery";
import Customerordertable from "./Customerordertable";
import Customerorderlist from "./Customerorderlist";
import Invoice from "./Invoice";
import Profile from "./Profile";
import Productshow from "./Productshow";
import Wishlist from "./Wishlist";
import Contact from "./Contact";

class User extends Component {
  constructor() {
    super();
    this.state = {
      addtocart: 0,
      cart: [],
      wish: [],
      totalprice: 0,
      wishlistnumber: 0,
    };
  }

  async componentDidMount() {
    // first fetch usercart

    await Axios.get(`${URL}/api/users/profile`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        auth: localStorage.getItem("auth"),
      },
    }).then(async (responseok) => {
      console.log(responseok.data);

      // if(responseok.data[0] && localStorage.getItem('auth') )
      // this.setState({wish:responseok.data[0].wishlist,wishlistnumber:responseok.data[0].wishlist.length})
      let cartItems = [];
      let wishitems = [];
      if (responseok.data && responseok.data[0]) {
        if (localStorage.getItem("auth") && responseok.data[0].cart) {
          if (responseok.data[0].cart.length > 0) {
            responseok.data[0].cart.forEach((item) => {
              cartItems.push(item.id);
            });
          }
        }
        if (localStorage.getItem("auth") && responseok.data[0].wishlist) {
          if (responseok.data[0].wishlist.length > 0) {
            responseok.data[0].wishlist.forEach((item) => {
              wishitems.push(item.id);
            });
          }
        }
      }

      if (wishitems.length) {
        await Axios.get(
          `${URL}/api/product/products_by_id?id=${wishitems}&type=array`
        ).then((result) => {
          console.log(result.data);
          this.setState({
            wish: result.data,
            wishlistnumber: result.data.length,
          });
        });
      } else {
        this.setState({ wish: [], wishlistnumber: 0 });
      }

      if (cartItems.length) {
        await Axios.get(
          `${URL}/api/product/products_by_id?id=${cartItems}&type=array`
        )
          .then((response) => {
            //   console.log(responseok.data.cart)

            //Make CartDetail inside Redux Store
            // We need to add quantity data to Product Information that come from Product Collection.
            let totalproduct = 0;
            let price = 0;
            responseok.data[0].cart.forEach((cartItem) => {
              response.data.forEach((productDetail, i) => {
                if (cartItem.id === productDetail._id) {
                  response.data[i].quantity = cartItem.quantity;
                  totalproduct += parseInt(cartItem.quantity);
                  price +=
                    parseInt(productDetail.price) * parseInt(cartItem.quantity);
                }
              });
            });
            this.setState({
              addtocart: totalproduct,
              cart: response.data,
              totalprice: price,
            });

            console.log(totalproduct);
          })
          .catch((err) => {
            // this.componentDidMount()
            console.log(err);
            this.setState({ addtocart: 0, cart: [], totalprice: 0 });
          });
      } else {
        this.setState({ addtocart: 0, cart: [], totalprice: 0 });
      }
    });
  }
  addTowishlist = (_id, type) => {
    if (!localStorage.getItem("auth"))
      return alert("Please Login to add to wish list");
    Axios.get(`${URL}/api/users/addToWish?productId=${_id}&type=${type}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        auth: localStorage.getItem("auth"),
      },
    }).then((response) => {
      if (response.data.duplicate) alert("Already in Your Wishlist");
      else this.componentDidMount();
    });
  };
  addToCarthandler = (_id, type) => {
    if (!localStorage.getItem("auth")) return alert("login to cart product");
    Axios.get(`${URL}/api/users/addToCart?productId=${_id}&type=${type}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        auth: localStorage.getItem("auth"),
      },
    }).then((response) => {
      this.componentDidMount();
      console.log(response.data);
    });
  };
  removeFromWish = (_id) => {
    if (!localStorage.getItem("auth")) return alert("login to cart product");
    Axios.get(`${URL}/api/users/removeFromWish?productId=${_id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        auth: localStorage.getItem("auth"),
      },
    })
      .then((response) => {
        console.log("err");
        this.componentDidMount();
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  removeFromCart = (_id) => {
    if (!localStorage.getItem("auth")) return alert("login to cart product");
    Axios.get(`${URL}/api/users/removeFromCart?productId=${_id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        auth: localStorage.getItem("auth"),
      },
    })
      .then((response) => {
        console.log("err");
        this.componentDidMount();
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  cartempty = () => {
    this.setState({ addtocart: 0 });
  };
  singleordersave = (data) => {
    this.setState({ singleorder: data });
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header
            addtocart={this.state.addtocart}
            wishlistnumber={this.state.wishlistnumber}
          />

          <div className="container-fluid mainContent">
            {/* <Breadcrumbs /> */}
            <Switch>
              <Route
                exact
                path="/wishlist"
                render={(props) => (
                  <Wishlist
                    wish={this.state.wish}
                    addToCarthandler={this.addToCarthandler}
                    removeFromWish={this.removeFromWish}
                    addtocartupdate={this.addtocartupdate}
                  />
                )}
              />
              <Route
                exact
                path="/cart"
                render={(props) => (
                  <Cart
                    cart={this.state.cart}
                    addToCarthandler={this.addToCarthandler}
                    removeFromCart={this.removeFromCart}
                    total={this.state.totalprice}
                    addtocartupdate={this.addtocartupdate}
                  />
                )}
              />
              <Route exact path="/cartdelete" component={Cartdelete} />
              <Route exact path="/userregister" component={Userregister} />
              <Route exact path="/userlogin" component={Userlogin} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/forgotpassword" component={Forgotpassword} />
              <Route exact path="/showmessege" component={Showmessege} />
              <Route
                exact
                path="/forgotpasswordform"
                component={Changepassword}
              />
              <Route
                exact
                path="/singleproduct/:productId"
                render={(props) => (
                  <Singleproducts
                    {...props}
                    addToCarthandler={this.addToCarthandler}
                  />
                )}
              />
              <Route
                exact
                path="/ordersummery"
                render={(props) => (
                  <Ordersummery
                    {...props}
                    cart={this.state.cart}
                    cartempty={this.cartempty}
                    total={this.state.totalprice}
                    addtocart={this.state.addtocart}
                  />
                )}
              />
              <Route
                exact
                path="/customerorderlist"
                render={(props) => <Customerorderlist />}
              />
              <Route
                exact
                path="/customerordertable/:orderid"
                render={(props) => (
                  <Customerordertable
                    {...props}
                    total={this.state.totalprice}
                    addtocart={this.state.addtocart}
                  />
                )}
              />
              <Route
                exact
                path="/invoice/:orderid"
                render={(props) => <Invoice {...props} />}
              />
              <Route
                exact
                path="/profile"
                render={(props) => <Profile {...props} />}
              />
              <Route
                exact
                path="/"
                render={(props) => (
                  <Productshow
                    {...props}
                    addTowishlist={this.addTowishlist}
                    removeFromWish={this.removeFromWish}
                    addToCarthandler={this.addToCarthandler}
                  />
                )}
              />
              <Route
                exact
                path="/:category"
                render={(props) => (
                  <Productshow
                    {...props}
                    addTowishlist={this.addTowishlist}
                    removeFromWish={this.removeFromWish}
                    addToCarthandler={this.addToCarthandler}
                  />
                )}
              />
            </Switch>
          </div>
          <hr></hr>
          <Contact />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default User;
