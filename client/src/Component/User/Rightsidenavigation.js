import React, { Component } from 'react'
import OffCanvas from 'react-aria-offcanvas'
import { Link } from 'react-router-dom'
 
const Navigation = () => (
  <nav id="menu" >
    <ul className="list-unstyled mx-2" >
      <li >
        <a href="/profile">Profile</a>
      </li>
      <li>
      <a href="/cart" >My Cart</a>
      </li>
      <li>
      <a href="/wishlist" >My Wishlist</a>
      </li>
      <li>
      <a href="/customerorderlist" >My Order</a>
      </li>
      <li>
      <a href="/logout">Log Out</a>
      </li>
    </ul>
  </nav>
)
 
export default class Rightsidenavigation extends Component {
  constructor(props){
    super()
   this.state = {
      isOpen:props.open,
    }
  }
componentWillReceiveProps(props){
  if(props.open)
 this.setState({isOpen:true});
 else
 this.setState({isOpen:false});

}
 
  open = () => {
    
    this.setState({ isOpen: true })
  }
 
  close = (props) => {
    this.setState({ isOpen: false })
    this.props.setOpen()
  }
 
  
  render() {
    return (
      <div >
        
        <OffCanvas
         className="myright"
          isOpen={this.state.isOpen}
          onClose={this.close}
          labelledby="menu-button"
          position="right"
         
         
        >
         <a href="/"> <button  style={{"marginTop": "63px",
   "marginRight": "-89px"}} onClick={this.close} >Close</button></a>
          <Navigation />
        </OffCanvas>
      </div>
    )
  }
}