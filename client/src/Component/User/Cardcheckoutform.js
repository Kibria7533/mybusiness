import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const {stripe, elements} = this.props;
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  render() {
    const {stripe} = this.props;
    return (
      <form onSubmit={this.handleSubmit} style={{
        "backgroundColor": " burlywood",
        "padding": "5px 20px 15px 20px",
        "border": "1px solid lightgrey",
        "borderRadius": "3px",
        height:"167px",
        justifyContent:"center",
        textAlign:"center",
       

        

    }}>
        <CardElement />
        <button type="submit" style={{
                                    size: 'large',
                                    color: 'blue',
                                    shape: 'rect',
                                   
                                   
                                    height: "45px",
                                    backgroundColor:"brown",
                                    paddingTop:"10px",
                                    marginTop:"77px"
                                  
                                }} disabled={!stripe}>
          Pay with Card
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = () => (
  <ElementsConsumer >
    {({stripe, elements}) => (
      <CheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);

const stripePromise = loadStripe('pk_test_51Hi2HMHu0idjSbzbNykfnF4XrpfpqKjYuQL4mbp6sWgYaRbvTWgToMqXnopYcqHsuTYbguiIpBG0FTiG5eGZ5dfs0036Sauasv');

const Cardcheckoutform = () => (
  <Elements  stripe={stripePromise}>
    <InjectedCheckoutForm  />
  </Elements>
);

export default Cardcheckoutform;