import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
 export default class Myloader extends React.Component {
  //other logic
    render() {
     return(
      <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={4000} //3 secs
 
      />
     );
    }
 }