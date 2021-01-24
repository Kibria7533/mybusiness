import React from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
    render() {

        localStorage.removeItem('auth');
        localStorage.removeItem('userrole');
        localStorage.removeItem('username');
        localStorage.clear(); 
        

        return (
            <Redirect to='/' />
        );
    }
}

export default Logout;