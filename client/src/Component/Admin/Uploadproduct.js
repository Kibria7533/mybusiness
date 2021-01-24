import React, { Component } from "react";
import Dropzone from "react-dropzone";

import { Multiselect } from "multiselect-react-dropdown";

import URL from "../User/Url";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
class Uploadproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      sub: [],
      data: [],
      brands: [{ name: "Apple" }, { name: "Iphone" }, { name: "Shaomi" }],
      Images: [],
      title: "",
      skunumber: "",
      discription: "",
      price: "",
      quantity: "",
      weaight: "",
      category: "",
      subcategory: "",
      brand: "",
      discount: "",
      stock: "",
      shippingdetails: "",
      manufacturesdetails: "",
      selectedsize: [],
      feature: false,
      trend: false,
      available: [{ name: "L" }, { name: "X" }, { name: "M" }],
    };
  }
  Changediscription = (e, data) => {
    this.setState({ description: data.getData() });
  };

  Changeshippingdetails = (e, data) => {
    this.setState({ shippingdetails: data.getData() });
  };

  Changemanufacturesdetails = (e, data) => {
    this.setState({ manufacturesdetails: data.getData() });
  };
  Change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  feature = () => {
    this.setState({ feature: !this.state.feature });
  };
  trend = () => {
    this.setState({ trend: !this.state.trend });
  };
  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedsize: selectedList });
  };
  onRemove = (selectedList, removedItem) => {
    const currentIndex = this.state.selectedsize.indexOf(removedItem);

    let newSizes = [...this.state.selectedsize];
    newSizes.splice(currentIndex, 1);

    this.setState({ selectedsize: newSizes });
  };

  category = (selectedList, selectedItem) => {
    this.setState({ category: selectedItem.name });
    {
      this.state.data.map((item) => {
        if (
          item.SubCategory.length > 0 &&
          item.CategoryName === selectedItem.name
        ) {
          const SubCategory = item.SubCategory.map((itemm) => {
            return { name: itemm.Name };
          });

          this.setState({ sub: SubCategory });
        }
      });
    }
  };
  subcategory = (selectedList, selectedItem) => {
    this.setState({ subcategory: selectedItem.name });
  };

  brand = (selectedList, selectedItem) => {
    this.setState({ brand: selectedItem.name });
  };

  onDrop = (files) => {
    console.log(files[0]);

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server
    axios
      .post(`${URL}/api/product/uploadImage`, formData, config)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            Images: [...this.state.Images, response.data.image],
          });
        } else {
          alert("Failed to save the Image in Server");
        }
      })
      .catch((err) => {
        console.log("hi");
        console.log(err);
      });
  };

  onDelete = (image) => {
    const currentIndex = this.state.Images.indexOf(image);

    let newImages = [...this.state.Images];
    newImages.splice(currentIndex, 1);

    this.setState({ Images: newImages });
  };
  async componentDidMount() {
    await axios
      .get(`${URL}/getmenus`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        this.setState({ data: data.data });
        const category = data.data.map((item) => {
          return { name: item.CategoryName };
        });

        this.setState({ options: category });
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {
      Images,
      title,
      skunumber,
      description,
      price,
      quantity,
      weaight,
      category,
      subcategory,
      brand,
      discount,
      stock,
      shippingdetails,
      manufacturesdetails,
      selectedsize,
      feature,
      trend,
    } = this.state;

    // if (!title) {
    //   return alert("Give a title of the product!");
    // }
    // if (!description) {
    //   return alert("Give a description of the product!");
    // }
    // if (!quantity) {
    //   return alert("Fill Quantity of the product!");
    // }
    // if (!category) {
    //   return alert("Give a categoy to the product!");
    // }
    // if (this.state.sub.length > 0 && !subcategory) {
    //   return alert("Choose a subcategory !");
    // }
    // if (!price) {
    //   return alert("Give a price of the product!");
    // }
    // if (!stock) {
    //   return alert("Fill stock!");
    // }
    // if (!skunumber) {
    //   return alert("Giv SKU number!");
    // }
    if (!Images) {
      return alert("Give a image of the product!");
    }

    const variables = {
      Images,
      title,
      skunumber,
      description,
      price,
      quantity,
      weaight,
      category,
      subcategory,
      brand,
      discount,
      stock,
      shippingdetails,
      manufacturesdetails,
      selectedsize,
      feature,
      trend,
    };

    axios
      .post(`${URL}/api/product/uploadProduct`, variables)
      .then((response) => {
        if (response.data.success) {
          alert("Product Successfully Uploaded");
        } else {
          alert("Failed to upload Product");
        }
      });
  };

  render() {
    const { editorState, selected } = this.state;

    return (
      <div className="container">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Dropzone onDrop={this.onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                {console.log("getRootProps", { ...getRootProps() })}
                {console.log("getInputProps", { ...getInputProps() })}
                <input {...getInputProps()} />
                <i className="fa fa-plus" style={{ fontSize: "3rem" }}></i>
                {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
              </div>
            )}
          </Dropzone>

          <div
            style={{
              display: "flex",
              width: "350px",
              height: "240px",
              overflowX: "scroll",
            }}
          >
            {this.state.Images.map((image, index) => (
              <div onClick={() => this.onDelete(image)}>
                <img
                  style={{ minWidth: "300px", width: "300px", height: "240px" }}
                  src={`${URL}/${image}`}
                  alt={`productImg-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              name="title"
              onChange={this.Change}
              value={this.state.title}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">SKU Number</label>
            <input
              type="text"
              name="skunumber"
              onChange={this.Change}
              value={this.state.skunumber}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Discription</label>

            <CKEditor
              editor={ClassicEditor}
              onChange={this.Changediscription}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Price</label>
            <input
              type="text"
              name="price"
              onChange={this.Change}
              value={this.state.price}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Quantity</label>
            <input
              type="text"
              name="quantity"
              onChange={this.Change}
              value={this.state.quantity}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Quantity"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Weaight</label>
            <input
              type="text"
              name="weaight"
              onChange={this.Change}
              value={this.state.weaight}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Quantity"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select Category</label>
            <Multiselect
              options={this.state.options} // Options to display in the dropdown
              selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
              onSelect={this.category} // Function will trigger on select event
              onRemove={this.onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              singleSelect="true"
            />
          </div>
          {this.state.sub.length > 0 && (
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Select Sub Category</label>
              <Multiselect
                options={this.state.sub} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.subcategory} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                singleSelect="true"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select Brand</label>
            <Multiselect
              options={this.state.brands} // Options to display in the dropdown
              selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
              onSelect={this.brand} // Function will trigger on select event
              onRemove={this.onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              singleSelect="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Discount</label>
            <input
              type="text"
              name="discount"
              onChange={this.Change}
              value={this.state.discount}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Discount"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Stock</label>
            <input
              type="text"
              name="stock"
              onChange={this.Change}
              value={this.state.stock}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Stock"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Shipping DEtails</label>

            <CKEditor
              editor={ClassicEditor}
              onChange={this.Changeshippingdetails}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Manufactures DEtails</label>

            <CKEditor
              editor={ClassicEditor}
              onChange={this.Changemanufacturesdetails}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select availabel Size</label>
            <Multiselect
              options={this.state.available} // Options to display in the dropdown
              selectedValues={this.state.selectedsize} // Preselected value to persist in dropdown
              onSelect={this.onSelect} // Function will trigger on select event
              onRemove={this.onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              name="featured"
              onChange={this.feature}
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Is Feature?
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="trend"
              onChange={this.trend}
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Is Trend?
            </label>
          </div>

          <div></div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Uploadproduct;
