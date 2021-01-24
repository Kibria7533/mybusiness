import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import URL from './Url'
import {withRouter} from 'react-router-dom'
class Adminlogin extends Component {constructor(){
  super();
  this.state={
    username:"",
    password:"",
    mesg:"",
    redirect: false,
  
  }
}
notify = () => toast.error(this.state.mesg);
savetostate=async (data)=>{
const name=data.target.name;
const value=data.target.value;
  this.setState({[name]:value});
}
formsubmit=async (data)=>{
data.preventDefault();
await axios.post(`${URL}/api/users/login-admin`, { 
  "username": this.state.username,
  "password": this.state.password,
},{
  headers:{
    'Accept':'application/json',
    'Content-Type':'application/json'
  }
}).then(data=>{
  localStorage.setItem('auth',data.data.token);
  localStorage.setItem('userrole',data.data.role);
  localStorage.setItem('username',data.data.username);
  console.log(data.data);
  this.props.history.push('/admindashboard');
}).catch(err=>{
  this.setState({mesg:err.response.data.message})
  this.notify();
  console.log(err.response)
})
}

 render(){
  if (this.state.redirect) {
    return (<Redirect to={{ pathname: '/admindashboard' }} />)
  }
        return (
          <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="user_card">
              <div className="d-flex justify-content-center">
                <div className="brand_logo_container">
                  <img src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png" className="brand_logo" style={{"width": "100px"}}alt="Logo" />
                </div>
              </div>
              <div className="d-flex justify-content-center form_container">
                <form onSubmit={this.formsubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-user" /></span>
                    </div>
                    <input type="text" name="username"onChange={this.savetostate} value={this.state.username} className="form-control input_user" autoComplete="off" placeholder="Your Email" />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-key" /></span>
                    </div>
                    <input type="password" name="password" onChange={this.savetostate} value={this.state.password}autoComplete="off" className="form-control input_pass" placeholder="Your password" />
                  </div>
                 
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button type="submit" name="button" className="btn login_btn">Login</button>
                  </div>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={15000}
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
              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Don't have an account? <a href="#" className="ml-2">Sign Up</a>
                </div>
                <div className="d-flex justify-content-center links">
                  <a href="#">Forgot your password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        );
    }
}

export default withRouter(Adminlogin);