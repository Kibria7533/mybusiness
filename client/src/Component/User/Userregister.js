import React, { Component } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './fb.css';
import URL from './Url';
import Myloader from './Myloader';

class Userregister extends Component {
    constructor() {
        super();
        this.state = {
          fullname: "",
          email: "",
          username: "",
          password: "",
          Address:"",
          Mobile:"",
          password_confirmation: "",
          redirect: false,
          redirecttocheck: false,
          error:"",
          loding:false
        }
    
      }
    
       
      notify = () => toast.error(this.state.error);
      savetostate = async (data) => {
        const name = data.target.name;
        const value = data.target.value;
        this.setState({ [name]: value });
      }
    
      formsubmit = async (e) => {
       e.preventDefault();
       this.setState({loding:true})
        await axios.post(`${URL}/api/users/register-user`, {
          "fullname": this.state.fullname,
          "email": this.state.email,
          "username": this.state.username,
          "address":this.state.Address,
          "mobile":this.state.Mobile,
          "password": this.state.password,
          "password_confirmation": this.state.password_confirmation
    
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(re=>{
            
             if(re.data.success){

              this.setState({loding:false, redirect: true })
              this.setState({error:"Please check Your Gmail To activate"})
              this.notify();
             }
           
            if(!re.data.success)
            this.setState({error:'Something went wrong'})
           
    
    
        }).catch(err=>{
          console.log(err.response.data.message.msg)
          this.setState({error:err.response.data.message.msg,loding:false})
          this.notify();
         
       
    
        })
       
      }
      SresponseGoogle = (response) => {
        axios.post('/google', { tokenId: response.tokenId }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(data => {
          localStorage.setItem('auth', data.data);
          console.log(data.data);
    
        }).finally(()=> this.setState({ redirect: true }));
    
      }
      FresponseGoogle = (response) => {
        console.log(response);
      }
      responseFacebook =async (response) => {
        
        await axios.post('/facebook', { accessToken: response.accessToken,userId:response.userID }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(data => {
          localStorage.setItem('auth', data.data);
          console.log(data.data);
          
    
        }).finally(()=> this.setState({ redirect: true })); 
        
        
      }
      render() {
        if (this.state.redirect) {
          return (<Redirect to={{ pathname: '/' }} />)
        }
        
        return (
          <div className="container register">
          <div className="row">
          <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from earning your own money!</p>
                        <input type="submit" name="" value="Login"/><br/>
                    </div>
            <div className="col-md-9 register-right">
            
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <h3 className="register-heading">Apply as a Employee</h3>
                  <form onSubmit={this.formsubmit}>
                  <div className="row register-form">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="text" name="fullname" className="form-control" onChange={this.savetostate} value={this.state.fullname}  placeholder="Your Full Name"  />
                      </div>
                      <div className="form-group">
                        <input type="text" name="username" className="form-control" onChange={this.savetostate} value={this.state.username}  placeholder="Username"  />
                      </div>
                     
                    
                      <div className="form-group">
                        <input type="text" name="Address" className="form-control" onChange={this.savetostate} value={this.state.Address}  placeholder="Your Address*" />
                      </div>
                      
                      <div className="form-group">
                        <input type="text" name="password" className="form-control" onChange={this.savetostate} value={this.state.password}  placeholder="Password *"  />
                      </div>
                      <div className="form-group">
                        <input type="text" name="password_confirmation"  className="form-control" onChange={this.savetostate} value={this.state.password_confirmation} placeholder="Confirm Password *"  />
                      </div>
                     
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="email" className="form-control" name="email" placeholder="Your Email *" onChange={this.savetostate} value={this.state.email}  />
                      </div>
                      <div className="form-group">
                        <input type="text" name="Mobile"  className="form-control" placeholder="Your Phone *"  onChange={this.savetostate} value={this.state.Mobile} />
                      </div>
                     {this.state.loding && <Myloader/>}
                     
                      <input type="submit" className="btnRegister"  defaultValue="Register" />
                      
                    </div>
                  </div>
                  </form>
                  <div className="d-flex justify-content-center my-4">
                    <GoogleLogin
                        clientId="255391627954-ns76akj2cfe49brdb9l4ndoktmvt2ret.apps.googleusercontent.com"
                        buttonText="google Login"
                        onSuccess={this.SresponseGoogle}
                        onFailure={this.FresponseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                       <FacebookLogin
                        appId="821163598451351"
                        autoLoad={false}
                        callback={this.responseFacebook}
                        cssClass="my-facebook-button-class"
                       
                        
                         />
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
               
              </div>
            </div>
          </div>
         
        </div>
        
        );
    }
}

export default Userregister;