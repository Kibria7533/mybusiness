import React, { Component } from 'react';
import URL from './Url'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import Myloader from './Myloader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Forgotpassword extends Component {
  constructor(){
    super();
    this.state={
      email:"",
      loading:false,
      mesg:""
    }
  }
  notify = () => toast.error(this.state.mesg);
  onchange=(e)=>{
this.setState({email:e.target.value});
  }
  sub=async(e)=>{
    e.preventDefault();
    this.setState({loading:true})
await axios.post(`${URL}/api/users/forgotpassordorusername`,{"email":this.state.email},{
  headers:{
    'Accept':'application/json',
    'Content-Type':'application/json'
  }
}).then(data=>{
  if (data.data.success) {
    this.props.history.push('/showmessege');
    this.setState({loading:false})
   
  }
}).catch((err)=>{
  this.setState({mesg:err.response.data.message,loding:false})
  this.props.history.push('/userlogin');
 this.notify();
 console.log(this.state.loding)
 


 
})
  }
    render() {
        return (
            <div className="row">
               
               <div className="error-404">
 <div className="d-flex justify-content-center">
                   {this.state.loading?
                   <Myloader/>: <form onSubmit={this.sub}>
                   <div className="form-group">
                     <label htmlFor="exampleInputEmail1"> Enter Your Email address</label>
                     <input type="email" name="email" onChange={this.onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                     <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                   </div>
                   
                   <button type="submit" className="btn btn-primary">Submit</button>
                 </form>}
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
                    {/* Same as */}
                    <ToastContainer />
              

 
</div>
            </div>
        );
    }
}

export default withRouter(Forgotpassword);