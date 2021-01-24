import React, { Component } from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import Axios from "axios";
import axios from "axios";
import Modal from "react-modal";
import URL from "../User/Url";
import Adminproductshow from "./Adminproductshow";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "react-ckeditor-component";

import { Multiselect } from "multiselect-react-dropdown";

export default class Manageproducts extends Component {
  constructor() {
    super();
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      Products: [],
      updatableid: "",
      showid: "",
      setIsOpen: false,
      options: [],
      sub: [],
      data: [],
      brands: [{ name: "Apple" }, { name: "Iphone" }, { name: "Shaomi" }],
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
      editmodal: false,
      available: [{ name: "L" }, { name: "X" }, { name: "M" }],
    };
  }
  getmenus = async () => {
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
  };
  openModal = (id) => {
    this.setState({ setIsOpen: true, showid: id });
  };

  closeModal = () => {
    this.setState({ setIsOpen: false, editmodal: false });
  };
  updateContent(newContent) {
    this.setState({
      shippingdetails: newContent,
    });
  }
  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }
  onChange = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      shippingdetails: newContent,
    });
  };
  onChangemanu = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      manufacturesdetails: newContent,
    });
  };
  onChangedes = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      description: newContent,
    });
  };
  onUpdate = async (e) => {
    e.preventDefault();
    const {
      updatableid,
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

    await axios
      .post(
        `${URL}/api/product/updateproduct`,
        {
          updatableid,
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
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        alert("Successfully Updated");

        this.closeModal();
        this.setState({
          setIsOpen: false,
          title: "",
          skunumber: "",
          description: "",
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
          selectedsize: "",
          feature: false,
          trend: false,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
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
  remove = async (id) => {
    await axios
      .get(
        `${URL}/api/product/deleteproduct/${id}`,

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

  edit = (id) => {
    this.state.Products.map((item, index) => {
      if (id == item._id) {
        this.setState({
          updatableid: id,
          title: item.title,
          skunumber: item.skunumber,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          weaight: item.weaight,
          category: item.category,
          subcategory: item.subcategory,
          brand: item.brand,
          discount: item.discount,
          stock: item.stock,
          shippingdetails: item.shippingdetails,
          manufacturesdetails: item.manufacturesdetails,
          selectedsize: item.selectedsize,
          feature: item.feature,
          trend: item.trend,
          editmodal: true,
        });
      }
    });
  };

  getProducts = async (variables) => {
    await Axios.post(`${URL}/api/product/getProducts`, variables).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({ Products: response.data.products });

          this.setState({ PostSize: response.data.postSize });
        } else {
          alert("Failed to fectch product datas");
        }
      }
    );
  };

  componentDidMount() {
    this.getProducts();
    this.getmenus();
  }

  render() {
    return (
      <div className="container-fluid">
        <Modal
          isOpen={this.state.setIsOpen}
          onRequestClose={this.closeModal}
          style={this.customStyles}
          contentLabel="Example Modal"
        >
          <Adminproductshow productId={this.state.showid} />
        </Modal>
        <Modal
          isOpen={this.state.editmodal}
          onRequestClose={this.closeModal}
          style={this.customStyles}
          contentLabel="Example Modal"
        >
          <div className="container">
            <div style={{ display: "flex", justifyContent: "center" }}></div>

            <form onSubmit={this.onUpdate}>
              <div className="form-row">
                <div className="form-group col-md-6">
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
                <div className="form-group col-md-6">
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
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
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
                <div className="form-group col-md-4">
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
                <div className="form-group col-md-4">
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
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Discription</label>

                <CKEditor
                  activeClass="p10"
                  content={this.state.description}
                  events={{
                    blur: this.onBlur,
                    afterPaste: this.afterPaste,
                    change: this.onChangedes,
                  }}
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
                  <label htmlFor="exampleInputEmail1">
                    Select Sub Category
                  </label>
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
              <div className="form-row">
                <div className="form-group col-md-6">
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
                <div className="form-group col-md-6">
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
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="exampleInputEmail1">Shipping DEtails</label>

                  <CKEditor
                    activeClass="p10"
                    content={this.state.shippingdetails}
                    events={{
                      blur: this.onBlur,
                      afterPaste: this.afterPaste,
                      change: this.onChange,
                    }}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="exampleInputEmail1">
                    Manufactures DEtails
                  </label>

                  <CKEditor
                    activeClass="p10"
                    content={this.state.manufacturesdetails}
                    events={{
                      blur: this.onBlur,
                      afterPaste: this.afterPaste,
                      change: this.onChangemanu,
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Select availabel Size
                </label>
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

              <div className="row justify-content-around">
                <button type="submit">Update Now</button>
                <button type="button" onClick={this.closeModal}>
                  close
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <h1 className="mt-4">Products</h1>

        <table className="table">
          <thead>
            <th>S No</th>
            <th>Title</th>
            <th>Image</th>
            <th>Sku Number</th>
            <th>Price</th>
            <th>Category</th>
            <th>S Category</th>
            <th>Details</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {this.state.Products.map((product, index) => {
              return (
                <tr key={index}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Title">{product.title}</td>

                  <td data-label="Image">
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src={`${URL}/${product.Images[0]}`}
                      alt={`sliderImg`}
                    />
                  </td>
                  <td data-label="Sku Number">{product.skunumber}</td>
                  <td data-label="Price">{product.price}</td>
                  <td data-label="Category">{product.category}</td>
                  <td data-label="S Category">{product.subcategory}</td>
                  <td data-label="Details">
                    <button>
                      <i
                        onClick={() => this.openModal(product._id)}
                        className="fa fa-search"
                      />
                    </button>
                  </td>
                  <td data-label="Actions">
                    <button
                      type="button"
                      onClick={() => this.remove(product._id)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    /
                    <button
                      type="button"
                      onClick={() => this.edit(product._id)}
                    >
                      <i class="fas fa-edit"></i>
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
