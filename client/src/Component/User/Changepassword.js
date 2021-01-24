import React, { Component } from 'react';
import axios from 'axios'
import URL from './Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Myloader from './Myloader';
class Changepassword extends Component {
    constructor(){
        super();
        this.state={
            password:"",
            password_confirm:"",
            mesg:"",
            loding:false
        
        }
      }
      notify = () => toast.error(this.state.mesg);
    savetostate= (data)=>{
      const name=data.target.name;
      const value=data.target.value;
        this.setState({[name]:value});
    }
    formsubmit=async (e)=>{
      e.preventDefault();
      this.setState({loding:true})
      await axios.post(`${URL}/api/users/subforgotpasswordforms/${this.props.match.params.token}`,this.state,{
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
         
        }
      }).then(data=>{
        this.setState({loding:false})
        if(data.data.success)
        this.props.history.push("/");
      }).catch(err=>{
        this.setState({mesg:err.response.data.message.msg,loding:false})
        console.log(err.response.data.message)
        console.log(err)
        this.notify();
      
      })
    }
    render() {
        return (
            <div className="container d-flex justify-content-center" style={{"height":"100vh","marginTop":"80px"}}>
            <div className="row">
              <div className="col-sm-12">
                  {this.state.loding && <Myloader/>}
                <h1>Change Password</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-sm-offset-6">
                <p className="text-center">Use the form below to change your password. Your password cannot be the same as your username.</p>
                <form onSubmit={this.formsubmit}>
                  <input type="password"  className="input-lg form-control" name="password" onChange={this.savetostate} value={this.state.password} id="password1" placeholder="New Password" autoComplete="off" />
                  
                  <input type="password" className="input-lg form-control" name="password_confirm" onChange={this.savetostate} value={this.state.password_confirm} id="password2" placeholder="Repeat Password" autoComplete="off" />
                 
                  <input type="submit" className="col-xs-12 btn btn-primary btn-load btn-lg" data-loading-text="Changing Password..." defaultValue="Change Password" />
                </form>
              </div>
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
          
        );
    }
}

export default Changepassword;