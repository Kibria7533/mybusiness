import React, { Component } from "react";
import Axios from "axios";
import SearchBox from "react-responsive-searchbox/lib/SearchBox";
import RadioBox from "./Sections/RadioBox";
import ScrollToTop from "react-scroll-to-top";

import { continents, price } from "./Sections/Datas";
import URL from "./Url";
class Productshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      Skip: null,
      Limit: 8,
      PostSize: 0,
      Filters: {
        price: [],
      },
      searchcategory: "",
      searchTerms: "",
    };
  }
  getProducts = async (variables) => {
    await Axios.post(`${URL}/api/product/getProducts`, variables).then(
      (response) => {
        if (response.data.success) {
          if (variables.loadMore) {
            this.setState({
              Products: [...this.state.Products, response.data.products[0]],
            });
            // console.log([...this.state.Products, response.data.products] )
          } else {
            this.setState({ Products: response.data.products });
          }
          this.setState({ PostSize: response.data.postSize });
        } else {
          alert("Failed to fectch product datas");
        }
      }
    );
  };
  handleSearchBoxValChange = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: this.state.Limit,
      filters: this.state.Filters,
      searchTerm: newSearchTerm.target.value,
    };

    this.setState({ Skip: 0 });
    // setSearchTerms(newSearchTerm)
    this.setState({ searchTerms: newSearchTerm.target.value });
    this.getProducts(variables);
  };

  componentDidMount() {
    // console.log(this.props.match.params.category)
    if (this.props.match.params.category) {
      Axios.get(
        `${URL}/api/product/getcategoryproduct/?category=${this.props.match.params.category}`
      ).then((response) => {
        this.setState({ Products: response.data });
      });
    } else {
      const variables = {
        skip: this.state.Skip,
        limit: this.state.Limit,
      };

      this.getProducts(variables);
    }
  }

  onLoadMore = () => {
    let skip = this.state.Skip + this.state.Limit;

    const variables = {
      skip: skip,
      limit: this.state.Limit,
      loadMore: true,
    };
    this.getProducts(variables);
    this.setState({ Skip: skip });
  };
  showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: this.state.Limit,
      filters: filters,
    };
    this.getProducts(variables);
    this.setState({ Skip: 0 });
  };
  handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log("array", array);
    return array;
  };
  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.Filters };

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    console.log(newFilters);

    this.showFilteredResults(newFilters);
    this.setState({ Filters: newFilters });
  };

  handleSearchBoxSubmit = (e) => {
    e.preventDefault();
    const variables = {
      skip: 0,
      limit: this.state.Limit,
      filters: this.state.Filters,
      searchTerm: this.state.searchTerms,
    };

    this.setState({ Skip: 0 });
    // setSearchTerms(newSearchTerm)
    this.setState({ searchTerms: "" });
    this.getProducts(variables);
  };

  render() {
    return (
      <div className="container-fluid">
        <div
          className="row justify-content-center desktopnav"
          style={{
            backgroundColor: "wheat",
            marginTop: "22px",

            justifyContent: "center",
          }}
        >
          <h3>
            আমরা সরাসরি লাইভে এসে ৬৪ জেলার পণ্য আপনার কাছে পৌচ্ছে দিতে প্রস্তুত
            আছি
          </h3>
        </div>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-lg-3">
            <div className="row">
              <div
                className="d-flex justify-content-around fixed  "
                style={{
                  marginTop: "32px",
                  border: "5px double #1C6EA4",
                  background: " #D0E4F5",
                }}
              >
                <div>
                  <RadioBox
                    list={price}
                    handleFilters={(filters) =>
                      this.handleFilters(filters, "price")
                    }
                  />
                </div>

                <div>
                  <SearchBox
                    placeholder="Enter search term"
                    value={this.state.searchBoxVal}
                    onchange={this.handleSearchBoxValChange}
                    searchBoxStyles={{
                      color: "dodgerBlue",
                      height: "24px",
                      border: "1px solid blue",
                    }}
                    searchButtonStyles={{
                      background: "dodgerBlue",
                      border: "1px solid blue",
                      padding: "0px",
                    }}
                    searchIconStyles={{
                      color: "#fff",
                      height: "24px",
                      lineHeight: "24px",
                    }}
                    OnSubmit={this.handleSearchBoxSubmit}
                  />
                </div>
              </div>
            </div>
            <h1 className="my-4">Top categories</h1>
            <div className="list-group">
              <a href="/Organic-Foods" className="list-group-item">
                Organic Foods
              </a>
              <a href="/Netflix" className="list-group-item">
                Netflix
              </a>

              <a href="/Premium-Courses" className="list-group-item">
                Web Development Course
              </a>
            </div>
          </div>
          {/* /.col-lg-3 */}
          <div className="col-lg-9">
            <div
              id="carouselExampleIndicators"
              className="carousel slide my-4"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={0}
                  className="active"
                />
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={1}
                />
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={2}
                />
              </ol>
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <img
                    className="d-block img-fluid"
                    src={`./images/s1.png`}
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block img-fluid"
                    src={`./images/s2.png`}
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block img-fluid"
                    src={`./images/s3.png`}
                    alt="Third slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block img-fluid"
                    src={`./images/s4.png`}
                    alt="Third slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <section className="our-publication pt-100 pb-70">
            <div className="container-fluid">
              <div className="section-header">
                <h2>FEATURED PRODUCTS</h2>
              </div>
              <div className="row">
                {this.state.Products.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-12 col-md-6 col-lg-3"
                      style={{ minWidth: "320px" }}
                    >
                      <div className="single-publication">
                        <figure>
                          <a href={`/singleproduct/${item._id}`}>
                            <img
                              style={{
                                width: "100%",
                                maxHeight: "150px",
                                minWidth: "100%",
                              }}
                              src={`${URL}/${item.Images[0]}`}
                              alt="productImage"
                            />
                          </a>
                          <ul style={{ right: "-13px" }}>
                            <li>
                              <button
                                title="Add to Favorite"
                                onClick={() =>
                                  this.props.addTowishlist(item._id, "add")
                                }
                              >
                                <i className="fa fa-heart" />
                              </button>
                            </li>
                            <li>
                              <a href="#" title="Add to Compare">
                                <i className="fa fa-refresh" />
                              </a>
                            </li>
                            <li>
                              <a
                                href={`/singleproduct/${item._id}`}
                                title="Quick View"
                              >
                                <i className="fa fa-search" />
                              </a>
                            </li>
                          </ul>
                        </figure>
                        <div className="publication-content">
                          <h3>
                            <a href={`/singleproduct/${item._id}`}>
                              {item.title}
                            </a>
                          </h3>
                          <ul>
                            <li>
                              <i className="icofont-star" />
                            </li>
                            <li>
                              <i className="icofont-star" />
                            </li>
                            <li>
                              <i className="icofont-star" />
                            </li>
                            <li>
                              <i className="icofont-star" />
                            </li>
                            <li>
                              <i className="icofont-star" />
                            </li>
                          </ul>
                          <h4 className="price">
                            {item.price -
                              parseInt((item.discount * item.price) / 100)}
                            /-
                            <span>{item.discount}%-</span>
                          </h4>
                        </div>
                        <div className="add-to-cart">
                          <button
                            onClick={() =>
                              this.props.addToCarthandler(item._id, "add")
                            }
                            className="default-btn"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
        <div>
          <ScrollToTop smooth color="#6f00ff" />
        </div>

        <div className="d-flex justify-content-center p-2">
          {this.state.PostSize >= this.state.Limit && (
            <div className="row">
              <div className="d-flex justify-content-center">
                <button onClick={this.onLoadMore}>Load More</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Productshow;
