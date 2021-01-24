import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import URL from './Url'
class Cart extends Component {
  constructor(props){
    super(props)

  }
    render() {
        return (
            <div className="container">
  <div className="card shopping-cart">
    <div className="card-header bg-dark text-light">
      <i className="fa fa-shopping-cart" aria-hidden="true" />
      Shipping cart
      <a href="/" className="btn btn-outline-info btn-sm pull-right">Continiu shopping</a>
      <div className="clearfix" />
    </div>
    <div className="card-body">
      {/* PRODUCT */}
      {this.props.cart.map((item,index)=>{
        return(
          <div key={index}>
          <div className="row" >
          <div className="col-12 col-sm-12 col-md-2 text-center">
            <img className="img-responsive"  src={`${URL}/${item.Images[0]}`} alt="prewiew" width={120} height={80} />
          </div>
          <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
        <h4 className="product-name"><strong>{item.title}</strong></h4>
            <h4>
       <div><small>{ ReactHtmlParser(item.description) }</small></div> 
            </h4>
          </div>
          <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
            <div className="col-3 col-sm-3 col-md-6 text-md-right" style={{paddingTop: '5px'}}>
              <h6><strong>{item.price} <span className="text-muted">x</span></strong></h6>
            </div>
            <div className="col-4 col-sm-4 col-md-4">
              <div className="quantity">
                <input type="button" onClick={()=>this.props.addToCarthandler(item._id,"add")}  value="+" className="plus" />
                <input type="button" step={1} max={99} min={1} value={item.quantity} title="Qty" className="qty" size={4} />
                <input type="button"  onClick={()=>this.props.addToCarthandler(item._id,"minus")} className="minus" value="-" />
              </div>
            </div>
            <div className="col-2 col-sm-2 col-md-2 text-right">
              <button type="button" onClick={()=>this.props.removeFromCart(item._id)} className="btn btn-outline-danger btn-xs">
                <i className="fa fa-trash" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <hr />
        </div>
        )
      })}
     
     
      {/* <div className="pull-right">
        <a href="#" className="btn btn-outline-secondary pull-right">
          Update shopping cart
        </a>
      </div> */}
    </div>
    <div className="card-footer">
      <div className="coupon col-md-5 col-sm-5 no-padding-left pull-left">
        <div className="row">
          <div className="col-6">
            <input type="text" className="form-control" placeholder="cupone code" />
          </div>
          <div className="col-6">
            <input type="submit" className="btn btn-default" placeholder="Use cupone" />
          </div>
        </div>
      </div>
      <div className="pull-right" style={{margin: '10px'}}>
        <a href="/ordersummery" className="btn btn-success pull-right">Checkout</a>
        <div className="pull-right" style={{margin: '5px'}}>
    Total price: <b>{this.props.total}</b>
        </div>
      </div>
    </div>
  </div>
</div>

        );
    }
}

export default Cart;