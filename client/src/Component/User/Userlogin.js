import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import URL from './Url'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import {withRouter} from 'react-router-dom'
import Myloader from './Myloader';
class Userlogin extends Component { constructor(){
  super();
  this.state={
    username:"",
    password:"",
    mesg:"",
    redirect: false,
    loding:false,
    cart:[]
  
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
this.setState({loding:true})
await axios.post(`${URL}/api/users/login-user`, {
  "username": this.state.username,
  "password": this.state.password,
},{
  headers:{
    'Accept':'application/json',
    'Content-Type':'application/json'
  }
}).then(data=>{
  const {cart}=this.state;
  localStorage.setItem('auth',data.data.token);
  localStorage.setItem('userrole',data.data.role);
  localStorage.setItem('username',data.data.username);
  localStorage.setItem('cart',data.data.usercart);
   console.log(data.data);
  this.setState({loding:false,redirect:true});
  this.props.history.push('/');
  window.location.reload(1);
}).catch(err=>{
  this.setState({mesg:err.response.data.message,loding:false})
  this.notify();
  // console.log(err)
})
}

 render(){
  // if (this.state.redirect) {
  //   return (<Redirect to={{ pathname: '/' }} />)
  // }
  if(this.state.loding){
    return(<Myloader/>)
  }
  else
        return (
          <div id="login">
          <h3 className="text-center text-white pt-5">Login form</h3>
          <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <form id="login-form" className="form" onSubmit={this.formsubmit}>
                    <h3 className="text-center text-info">Login</h3>
                    <div className="form-group">
                      <label htmlFor="username" className="text-info">Username:</label><br />
                      <input type="text" name="username" id="username" onChange={this.savetostate} value={this.state.username}  className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="text-info">Password:</label><br />
                      <input type="text" name="password" id="password" onChange={this.savetostate} value={this.state.password}  className="form-control" />
                    </div>
                    <div className="d-flex justify-content-center">
                    <GoogleLogin
                        clientId="255391627954-ns76akj2cfe49brdb9l4ndoktmvt2ret.apps.googleusercontent.com"
                        buttonText="google Login"
                        onSuccess={this.SresponseGoogle}
                        onFailure={this.FresponseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                       <FacebookLogin
                        appId="335565637562761"
                        autoLoad={false}
                        callback={this.responseFacebook}
                        cssClass="my-facebook-button-class"
                       
                        
                         />
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
                    <div className="d-flex justify-content-between p-3">
                      <Link to="/forgotpassword">Forgot Password?</Link>
                      <Link to="/forgotpassword">Want to recover your Account?</Link>
                    
                    </div>
                    <div className="form-group">
                      <label htmlFor="remember-me" className="text-info"><span>Remember me</span><span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                      <input type="submit" name="submit" className="btn btn-info btn-md" defaultValue="submit" />
                    </div>
                    <div id="register-link" className="text-right">
                      <a href="/userregister" className="text-info">Register here</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
          
        );
    }
}

export default withRouter(Userlogin);