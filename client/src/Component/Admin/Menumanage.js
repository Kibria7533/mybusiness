import React, { Component } from 'react';
import axios from 'axios'
import URL from '../User/Url'
import FlatList from 'flatlist-react';

import Remodal from './Remodal';

class Menumanage extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      simplemenu: "",
      dropmenuholder: "",
      megamenuholder: "",
      drop:"",
      mega:"",
      subdrop:"",
      submega:"",
      editcategory:"",
      modal:false,
      editsubcategory:"",
      edittype:""

    }
  }

  async componentDidMount() {


    await axios.get(`${URL}/getmenus`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      }
    }).then(data => {
      this.setState({ data: data.data })


    })

  }

  renderPerson = (person, idx) => {
    return (
      <li key={idx} className="list-unstyled mt-2 mb-2">
        <b>{person.Name} </b>
        <button type="button" className="btn btn-secondary btn-sm" onClick={()=>this.categoryedit(person.Name,"subcategory")}><i className="fa fa-edit" style={{ "fontSize": "16px" }}></i></button>
        <button type="button" className="btn btn-secondary btn-sm ml-2" onClick={()=>this.deletesubcategory(person.Name)}><i className="fa fa-close" style={{ "fontSize": "16px" }}></i></button>
      </li>
    )
  }
  simplemenuadd = (e) => {

    const value = e.target.value;
    this.setState({ simplemenu: value });
  }
  dropdownmenuholderhandeler = (e) => {
    this.setState({ dropmenuholder: e.target.value });

  }
  megamenuholderhandeler = (e) => {
    this.setState({ megamenuholder: e.target.value })

  }
  simplemenusubmit = async (data) => {
    data.preventDefault();
    await axios.post(`${URL}/savemenu`, { "categoryname": this.state.simplemenu, "Type": "simplemenu" }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':localStorage.getItem('auth')
      }
    }).then(data => {
     
      if (data.data.success) {
        this.componentDidMount();
        this.setState({simplemenu:""})
      }
    })
      .catch(err => {
        console.log(err);
      })

  }
  dropdownholdersubmit=async (data) => {
    data.preventDefault();
    await axios.post(`${URL}/savemenu`, { "categoryname": this.state.dropmenuholder, "Type": "dropdownmenu" }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':localStorage.getItem('auth')
      }
    }).then(data => {
     
      if (data.data.success) {
        this.componentDidMount();
        this.setState({dropmenuholder:""})
      }
    })
      .catch(err => {
        console.log(err);
      })

  }
  megaholdersub=async (data) => {
    data.preventDefault();
    await axios.post(`${URL}/savemenu`, { "categoryname": this.state.megamenuholder, "Type": "megamenu" }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':localStorage.getItem('auth')
      }
    }).then(data => {
     
      if (data.data.success) {
        this.componentDidMount();
        this.setState({megamenuholder:""})
      }
    })
      .catch(err => {
        console.log(err);
      })

  }
  dropset=(data)=>{
    this.setState({drop:data.target.value})

  }
  subdropset=(e)=>{
 this.setState({subdrop:e.target.value})
  }
  megaset=(data)=>{
    this.setState({mega:data.target.value})

  }
  submegaset=(e)=>{
this.setState({submega:e.target.value});
  }
  addsubdrop=async (e)=>{
e.preventDefault();
await axios.post(`${URL}/addasubcategory`, { "CategoryName": this.state.drop, "SubCategory": this.state.subdrop }, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'auth':localStorage.getItem('auth')
  }
}).then(data => {
 
  if (data.data.success) {
    this.componentDidMount();
    this.setState({subdrop:""})
  }
})
  .catch(err => {
    console.log(err);
  })

  }
  addmegasub=async (e)=>{
    e.preventDefault();
    await axios.post(`${URL}/addasubcategory`, { "CategoryName": this.state.mega, "SubCategory": this.state.submega }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':localStorage.getItem('auth')
      }
    }).then(data => {
     
      if (data.data.success) {
        this.componentDidMount();
        this.setState({submega:""})
      }
    })
      .catch(err => {
        console.log(err);
      })
    
      }


      categoryedit=async(data,type)=>{
        
          
             this.setState({editcategory:data,modal:!this.state.modal,edittype:type});
         
       
       
        
      }
      modalclose=async(data)=>{
        
        if(this.state.edittype==='category'){

await axios.post(`${URL}/editcategory`, { "oldcategory": this.state.editcategory, "newcategory": data }, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'auth':localStorage.getItem('auth')
  }
}).then(data => {
 
  if (data.data.success) {
    this.componentDidMount();
    this.setState({editcategory:"",edittype:""})
  }
})
  .catch(err => {
    console.log(err);
  })

        }else{
          console.log(this.state.editcategory,this.state.edittype,data)
          await axios.post(`${URL}/editsubcategory`, { "oldsubcategory": this.state.editcategory, "newsubcategory": data }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth':localStorage.getItem('auth')
            }
          }).then(data => {
           
            if (data.data.success) {
              this.componentDidMount();
              this.setState({editcategory:"",edittype:""})
            }
          })
            .catch(err => {
              console.log(err);
            })
        }
      
        this.setState({modal:!this.state.modal});
      }

      deletecategory=async(id)=>{

          await axios.post(`${URL}/deletecategory`, { id }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth':localStorage.getItem('auth')
            }
          }).then(data => {
           
            if (data.data.success) {
              this.componentDidMount();
             
            }
          })
            .catch(err => {
              console.log(err);
            })
      }
      deletesubcategory=async (data)=>{
        await axios.post(`${URL}/deletesubcategory`, { "subcategory":data }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth':localStorage.getItem('auth')
          }
        }).then(data => {
         
          if (data.data.success) {
            this.componentDidMount();
           
          }
        })
          .catch(err => {
            console.log(err);
          })
      }
  render() {
    return (
      <div>
        <div>
          <div className="d-flex justify-content-center">
            <h2>Add Menu here</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <form className="form-inline" onSubmit={this.simplemenusubmit}>

              <div className="form-group  mb-2">

                <input type="text" name="simplemenu" onChange={this.simplemenuadd} value={this.state.simplemenu} className="form-control" placeholder="Simple menu" />
              </div>
              <button type="submit" className="btn btn-primary mb-2">Add</button>
            </form>

          </div>
          <div className="col-lg-4">
            <form className="form-inline" onSubmit={this.dropdownholdersubmit}>

              <div className="form-group mx-sm-3 mb-2">
               
                <input type="text" name="dropmenuholder" onChange={this.dropdownmenuholderhandeler} value={this.state.dropmenuholder} className="form-control" id="inputPassword2" placeholder="Drop down Holder" />
              </div>
              <button type="submit" className="btn btn-primary mb-2">Add</button>
            </form>
          </div>
          <div className="col-lg-4">
            <form className="form-inline" onSubmit={this.megaholdersub}>

              <div className="form-group mx-sm-3 mb-2">
             
                <input type="text" name="megamenuholder" className="form-control" onChange={this.megamenuholderhandeler} value={this.state.megamenuholder} id="inputPassword2" placeholder="Mega menu" />
              </div>
              <button type="submit" className="btn btn-primary mb-2">Add</button>
            </form>
          </div>

        </div>
        <div className="row">
          <div className="col-lg-6 mb-3">
         
            <form className="form-inline" onSubmit={this.addsubdrop}>
            <div className="form-group">
    <label style={{paddingRight:"5px"}}>Dropdownholder Select</label>
    <select className="form-control" onChange={this.dropset}  >
      <option value="0">Please select Dropdownholder</option>
      {this.state.data.map((item,index)=>{
        if(item.Type==='dropdownmenu'){
        return( <option key={index}value={`${item.CategoryName}`}>{item.CategoryName}</option>)
        }

 
      })}
     
    </select>
  </div>
              <div className="form-group  mb-2 mt-2">

                <input type="text" className="form-control"  name="subdrop" onChange={this.subdropset} value={this.state.subdrop} placeholder="Sub drop menu" />
              </div>
              <button type="submit" className="btn btn-primary mb-2 ml-2">Add</button>
            </form>
          </div>
          <div className="col-lg-6">
        
            <form className="form-inline" onSubmit={this.addmegasub}>
            <div className="form-group">
    <label htmlFor="exampleFormControlSelect1" style={{paddingRight:"5px"}}>Megamenuholder Select</label>
    <select className="form-control" id="exampleFormControlSelect1" onChange={this.megaset}>
    <option value="0">Please select Megaholder</option>
    {this.state.data.map((item,index)=>{
        if(item.Type==='megamenu'){
        return( <option key={index} value={`${item.CategoryName}`}>{item.CategoryName}</option>)
        }

 
      })}
    </select>
  </div>
              <div className="form-group  mb-2 mt-2">

                <input type="text" className="form-control" id="inputPassword2" name="submega" onChange={this.submegaset} value={this.state.submega} placeholder="Add to your megamenu" />
              </div>
              <button type="submit" className="btn btn-primary mb-2 ml-2">Add</button>
            </form>
          </div>


        </div>
        <div className="d-flex justify-content-center">
          <h2>All Mega Menus</h2>
        </div>

        {this.state.data.map((item, index) => {
          if (item.Type === "megamenu") {
            return (
              <div key={index}>



                <div className="d-flex justify-content-center my-4">

                  <button type="button" className="btn btn-primary btn-lg">{item.CategoryName}</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={()=>this.categoryedit(item.CategoryName,"category")}><i className="fa fa-edit" style={{ "fontSize": "16px" }}></i></button>
        <button type="button" className="btn btn-secondary btn-sm ml-2"onClick={()=>this.deletecategory(item._id)}><i className="fa fa-close" style={{ "fontSize": "16px" }}></i></button>
                </div>

                <div className="row">
                  <FlatList
                    list={item.SubCategory}
                    renderItem={this.renderPerson}
                    renderWhenEmpty={() =><div className="d-flex justify-content-center my-4" >You didn't add any sub  category yet</div>}
                    display={{
                      grid: true,
                      minColumnWidth: "5px",
                      gridGap: "10px"
                    }}

                  />
                </div>

              </div>
            )



          }

        })}
        <div className="d-flex justify-content-center">
          <h2>All Dropdown Menus</h2>
        </div>
        {this.state.data.map((item, index) => {
          if (item.Type === "dropdownmenu") {
            return (
              <div key={index}>



                <div className="d-flex justify-content-center my-4">

                  <button type="button" className="btn btn-primary btn-lg">{item.CategoryName}</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={()=>this.categoryedit(item.CategoryName,"category")}><i className="fa fa-edit" style={{ "fontSize": "16px" }}></i></button>
        <button type="button" className="btn btn-secondary btn-sm ml-2"onClick={()=>this.deletecategory(item._id)}><i className="fa fa-close" style={{ "fontSize": "16px" }}></i></button>
                </div>

                <div className="row">
                  <FlatList
                    list={item.SubCategory}
                    renderItem={this.renderPerson}
                    renderWhenEmpty={() =><div className="d-flex justify-content-center my-4">You didn't add any sub category yet</div>}
                    display={{
                      grid: true,
                      minColumnWidth: "5px",
                      gridGap: "10px"
                    }}

                  />
                </div>

              </div>
            )



          }

        })}
        <div className="d-flex justify-content-center">
          <h2>All Simple Menus</h2>
        </div>
        {this.state.data.map((item, index) => {
          if (item.Type === "simplemenu") {
            return (
              <li key={index} className="list-unstyled mt-2 mb-2">
                <b>{item.CategoryName} </b>
                <button type="button" className="btn btn-secondary btn-sm" onClick={()=>this.categoryedit(item.CategoryName,"category")}><i className="fa fa-edit" style={{ "fontSize": "16px" }}></i></button>
                <button type="button" className="btn btn-secondary btn-sm ml-2" onClick={()=>this.deletecategory(item._id)}><i className="fa fa-close" style={{ "fontSize": "16px" }}></i></button>
              </li>
            )



          }

        })}
<Remodal modal={this.state.modal} data={this.state.editcategory} modalclose={this.modalclose}/>
      </div>
    );
  }
}

export default Menumanage;