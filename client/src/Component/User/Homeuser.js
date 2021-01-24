import React, { Component } from 'react';
import Productshow from './Productshow';

class Homeuser extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div >
               <Productshow category={this.props.match.params.category} addToCarthandler={this.props.addToCarthandler}/>
            </div>
        );
    }
}

export default Homeuser;