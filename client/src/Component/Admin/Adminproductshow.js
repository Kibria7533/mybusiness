import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import Axios from "axios";
import URL from "../User/Url";
import Comments from "../User/Comments";
import ReactStars from "react-rating-stars-component";
import Collapsible from "react-collapsible";
import Avatar from "react-avatar";
import Moment from "react-moment";
import { Multiselect } from "multiselect-react-dropdown";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
export default class Adminproductshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Product: [],
      images: [],
      sizes: [],
      comment: "",
      rating: 0,
      commentshow: true,
      detailsshow: false,
      comments: [],
    };
  }

  componentDidMount() {
    // productId = this.props.productId;
    // console.log(this.productId);
    Axios.get(
      `${URL}/api/product/products_by_id?id=${this.props.productId}&type=single`
    )
      .then((response) => {
        if (response.data[0].Images.length > 0) {
          let images = [];

          response.data[0].Images.map((item) => {
            images.push({
              original: `${URL}/${item}`,
              thumbnail: `${URL}/${item}`,
            });
          });
          this.setState({ images });
        }

        this.setState({ Product: response.data[0] });
        this.setState({ sizes: response.data[0].selectedsize });
        this.getcomment();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getcomment = () => {
    Axios.get(
      `${URL}/getsingularproductcomment?id=${this.props.productId}&type=single`
    )
      .then((result) => {
        this.setState({ comments: result.data, comment: "", rating: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ratingChanged = (newRating) => {
    this.setState({ rating: newRating });
  };
  onchange = (e) => {
    this.setState({ comment: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("auth")) return alert("Please login to comment");
    Axios.post(
      `${URL}/savecomment&reviews`,
      {
        comment: this.state.comment,
        rating: this.state.rating,
        productId: this.productId,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
      }
    ).then((res) => {
      this.getcomment();
    });
  };
  render() {
    const calendarStrings = {
      lastDay: "[Yesterday at] LT",
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      lastWeek: "[last] dddd [at] LT",
      nextWeek: "dddd [at] LT",
      sameElse: "L",
    };
    return (
      <div className="container-fluid">
        <div className="card">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6 lg-6">
                <ImageGallery items={this.state.images} />
              </div>
              {/* {this.state.Product.map((item,index)=>{
            return(
              
            )
          })} */}
              <div className="details col-md-6">
                <h3 className="product-title">{this.state.Product.title}</h3>
                <div className="rating">
                  <ReactStars
                    value={5}
                    isHalf
                    count={5}
                    onChange={this.ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                  <span className="review-no">
                    {this.state.comments.length} reviews
                  </span>
                </div>
                <div className="product-description">
                  {ReactHtmlParser(this.state.Product.description)}
                </div>
                <h4 className="price">
                  current price: <span>${this.state.Product.price}</span>
                </h4>
                <p className="vote">
                  <strong>91%</strong> of buyers enjoyed this product!{" "}
                  <strong>({this.state.comments.length} votes)</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-9">
            <ul className="menu-items">
              <li
                className={this.state.commentshow ? "active" : ""}
                onClick={() =>
                  this.setState({
                    commentshow: !this.state.commentshow,
                    detailsshow: !this.state.detailsshow,
                  })
                }
              >
                Comments and review
              </li>
              <li
                className={this.state.detailsshow ? "active" : ""}
                onClick={() =>
                  this.setState({
                    commentshow: !this.state.commentshow,
                    detailsshow: !this.state.detailsshow,
                  })
                }
              >
                Details Features
              </li>
            </ul>
            {this.state.commentshow && (
              <div className="container">
                <div className="container-fluid">
                  <div className="row">
                    <div className="panel panel-default widget">
                      <div className="panel-heading">
                        <span className="glyphicon glyphicon-comment" />
                        <h3 className="panel-title">Recent Comments</h3>
                        <span
                          className="label label-info ml-5 "
                          style={{ marginTop: "9px" }}
                        >
                          {this.state.comments.length}
                        </span>
                      </div>
                      <div className="panel-body">
                        <ul className="list-group">
                          {this.state.comments.map((item, index) => {
                            return (
                              <li
                                className="list-group-item"
                                key={index}
                                style={{ minWidth: "400px" }}
                              >
                                <div className="row">
                                  <div className="col-xs-10 col-md-11 ml-1">
                                    <div>
                                      <a>
                                        {" "}
                                        <ReactStars
                                          value={item.ratings}
                                          isHalf
                                          count={5}
                                          onChange={this.ratingChanged}
                                          size={24}
                                          activeColor="#ffd700"
                                        />
                                      </a>
                                      <div className="mic-info">
                                        By: <a href="#">{item.username}</a>{" "}
                                        <Moment calendar={calendarStrings}>
                                          {item.createdAt}
                                        </Moment>
                                      </div>
                                    </div>
                                    <div className="comment-text">
                                      {item.comment}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.state.detailsshow && (
              <small style={{ marginTop: "10px" }}>
                <h5>Shipping Details</h5>
                {ReactHtmlParser(this.state.Product.shippingdetails)}

                <h5>Manufacturer Details</h5>
                {ReactHtmlParser(this.state.Product.manufacturesdetails)}
              </small>
            )}
          </div>
        </div>
      </div>
    );
  }
}
