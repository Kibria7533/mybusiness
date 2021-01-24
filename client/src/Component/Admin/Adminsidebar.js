import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "react-sidebar";



class Adminsidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: props.thishandleSidebar
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render() {
        return (
            <Sidebar
                sidebar={
                    
                    <div className="list-group list-group-flush">
                        
                        <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                        <Link to="/admindashboard/menus" className="list-group-item list-group-item-action bg-light">Manage Menus</Link>
                        <Link to="/admindashboard/users" className="list-group-item list-group-item-action bg-light">Manage Users</Link>
                        <Link to="/admindashboard/uploadproduct" className="list-group-item list-group-item-action bg-light">Manage Products</Link>
                        <Link to="/manageprojects" className="list-group-item list-group-item-action bg-light">Manage Projects</Link>
                        <Link to="/managefaq" className="list-group-item list-group-item-action bg-light">Manage Faq</Link>
                        <Link to="/managecontact" className="list-group-item list-group-item-action bg-light">Manage Contact</Link>
                    </div>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: {"background": "white", "marginTop": "55px" } }}
                
               
            >
              
                <button style={{ marginTop: "14px", "marginLeft": "25px", "backgroundColor": "violet" }} className="mobilenav navbar-toggler" onClick={() => this.onSetSidebarOpen(true)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            </Sidebar>
        );
    }
}

export default Adminsidebar;