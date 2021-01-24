import React, { Component } from 'react';
import Modal from 'react-modal';
class Remodal extends Component {
    constructor (props) {
      super(props);
      this.state={
        sh:false,
        data:""
      }
      
    }
    componentWillMount() {
        Modal.setAppElement('body');
        
    }
    componentDidUpdate(prevProps){
      if (prevProps.modal !== this.props.modal) {
      
       this.setState({sh:this.props.modal,data:this.props.data})
      }
    

    }
    customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
   change=(e)=>{
   this.setState({data:e.target.value})
   }
    
    render () {
      return (
        <div>
         
          <Modal 
             isOpen={this.state.sh}
             contentLabel="Minimal Modal Example"
             style={this.customStyles}
          >
              
               <input value={this.state.data} onChange={this.change} />
            <button onClick={()=>this.props.modalclose(this.state.data)}>Save</button>          
          </Modal>
        </div>
      );
    }
  }
  
  export default Remodal;