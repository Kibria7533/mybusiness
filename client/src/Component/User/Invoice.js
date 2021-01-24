import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';
import Makeinvoice from './Makeinvoice'
export default class Invoice extends Component {
    constructor(props){
        super(props)
    }
    orderid =this.props.match.params.orderid
    render() {
        return (
            <div style={{marginTop:"100px",marginLeft:"70px"}}>
               <td><button> <div>
<ReactToPrint
  trigger={() => {
   
    return <a href="#">Print this out!</a>;
  }}
  content={() => this.componentRef}
/>
<Makeinvoice orderid={this.orderid}  ref={el => (this.componentRef = el)} />
</div></button></td>
            </div>
        )
    }
}
