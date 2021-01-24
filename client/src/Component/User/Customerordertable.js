import React, { Component } from 'react'
import URL from './Url'
import Moment from 'react-moment';
import Axios from 'axios'
export default class Customerordertable extends Component {
  constructor(props){
    super(props)
    this.state={
        singleorder:[]
    }
}
orderid =this.props.match.params.orderid
getorder=()=>{
    Axios.get(`${URL}/getsingleorder?orderid=${this.props.match.params.orderid}`,{ headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':localStorage.getItem('auth')
      }
    }).then(item=>{
        console.log(item.data)
        this.setState({singleorder:item.data})
       
    })
}

componentDidMount(){
    console.log('ordertt',this.props.match.params.orderid)
    this.getorder()
}
    render() {
        return (
            <div className="container">
  <article className="card">
    <header className="card-header"> My Orders / Tracking </header>
    {this.state.singleorder.map((item,index)=>{
      return(
<div className="card-body">
      <h6>Order ID:{item.orderid}</h6>
      <article className="card">
        <div className="card-body row">
      <div className="col-md-4"> <strong>Estimated Delivery time:</strong> <br /><Moment add={{ days: 7, hours: 12 }}>{item.createdAt}</Moment></div>
          <div className="col-md-4"> <strong>Shipping BY:</strong> <br /> MAD_ECOM, | <i className="fa fa-phone" /> +01720588884 </div>
          <div className="col-md-4"> <strong>Status:</strong> <br /> {item.orderstatus==1&&<td><button>pending</button></td>}
        {item.orderstatus==2&&<td><button>accepted</button></td>}
        {item.orderstatus==3&&<td><button>on the way</button></td>}
        {item.orderstatus==4&&<td><button>completed</button></td>} </div>
         
        </div>
      </article>
      <div className="track">
        <div className="step active"> <span className="icon"> <i className="fa fa-check" /> </span> <span className="text">Order confirmed</span> </div>
        <div className={item.orderstatus==2 || item.orderstatus==3 || item.orderstatus==4?"step active":"step"}> <span className="icon"> <i className="fa fa-user" /> </span> <span className="text"> Picked by courier</span> </div>
        <div className={item.orderstatus==3 || item.orderstatus==4 ?"step active":"step"}> <span className="icon"> <i className="fa fa-truck" /> </span> <span className="text"> On the way </span> </div>
        <div className={item.orderstatus==4 ?"step active":"step"}> <span className="icon"> <i className="fa fa-box" /> </span> <span className="text">Ready for pickup</span> </div>
      </div>
      <hr />
      
      <ul className="row">
      {item.products.map((it,index)=>{
        return(
<li className="col-md-4" key={index}>
          <figure className="itemside mb-3">
            <div className="aside"><img src={`${URL}/${it.Images[0]}`} className="img-sm border" /></div>
            <figcaption className="info align-self-center">
        <p className="title">{it.title} <br /> {it.brand}</p> <span className="text-muted">${it.price} </span>
            </figcaption>
          </figure>
        </li>
        )
      })}
        
       
        
      </ul>
      <hr />
      <a href="/customerorderlist" className="btn btn-warning" data-abc="true"> <i className="fa fa-chevron-left" /> Back to orders</a>
    </div>
      )
    })}
    
  </article>
</div>


        )
    }
}
