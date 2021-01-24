import React, { Component } from 'react';

class Adminbody extends Component {
    render() {
        return (
            <div>
                <div className="row">
  <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
    {/* flight section */}
    <div className="bhoechie-tab-content active">
      <center>
     <b> <i className="fa fa-gears" style={{"fontSize":"76px"}}></i></b>
       
        <h2 style={{marginTop: 0, color: '#00001a'}}>Welcome</h2>
        <h3 style={{marginTop: 0, color: '#00001a'}}>Administrator</h3>
      </center>
    </div>
  </div>
</div>
<div className="row ">
  <div className="col-lg-6">
    <div className="list-group">
      <a href="http://www.jquery2dotnet.com" className="list-group-item visitor">
        <h3 className="pull-right">
          <i className="fa fa-eye" />
        </h3>
        <h4 className="list-group-item-heading count">
          1000</h4>
        <p className="list-group-item-text">
          Profile Views</p>
      </a><a href="http://www.jquery2dotnet.com" className="list-group-item facebook-like">
        <h3 className="pull-right">
          <i className="fa fa-facebook-square" />
        </h3>
        <h4 className="list-group-item-heading count">
          1000</h4>
        <p className="list-group-item-text">
          Facebook Likes</p>
      </a><a href="http://www.jquery2dotnet.com" className="list-group-item google-plus">
        <h3 className="pull-right">
          <i className="fa fa-google-plus-square" />
        </h3>
        <h4 className="list-group-item-heading count">
          1000</h4>
        <p className="list-group-item-text">
          Google+</p>
      </a><a href="http://www.jquery2dotnet.com" className="list-group-item twitter">
        <h3 className="pull-right">
          <i className="fa fa-twitter-square" />
        </h3>
        <h4 className="list-group-item-heading count">
          1000</h4>
        <p className="list-group-item-text">
          Twitter Followers</p>
      </a>
    </div>
  </div>
  <div className="col-lg-6">
    <div className="list-group">
      <a href="http://www.jquery2dotnet.com" className="list-group-item tumblr">
        <h3 className="pull-right">
          <i className="fa fa-tumblr-square" />
        </h3>
        <h4 className="list-group-item-heading count">
          1000</h4>
        <p className="list-group-item-text">
          Tumblr</p>
      </a><a href="http://www.jquery2dotnet.com" className="list-group-item linkedin">
        <h3 className="pull-right">
          <i className="fa fa-linkedin-square" />
        </h3>
        <h4 className="list-group-item-heading count">
          1000</h4>
        <p className="list-group-item-text">
          Linkedin</p>
      </a><a href="http://www.jquery2dotnet.com" className="list-group-item youtube">
        <h3 className="pull-right">
          <i className="fa fa-youtube-play" />
        </h3>
        <h4 className="list-group-item-heading count">
          1000</h4>
        <p className="list-group-item-text">
          Youtub Play</p>
      </a><a href="http://www.jquery2dotnet.com" className="list-group-item vimeo">
        <h3 className="pull-right">
          <i className="fa fa-vimeo-square" />
        </h3>
        <h4 className="list-group-item-heading count">
          1000</h4>
        <p className="list-group-item-text">
          Vimeo</p>
      </a>
    </div>
  </div>
</div>

                

<div className="row">
  <div className="col-lg-12">
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">
          <span className="glyphicon glyphicon-bookmark" /> Quick Shortcuts</h3>
      </div>
      <div className="panel-body">
        <div className="row">
          <div className="col-xs-6 col-lg-6">
            <a href="#" className="btn btn-danger btn-lg" role="button"><span className="glyphicon glyphicon-list-alt" /> <br />Apps</a>
            <a href="#" className="btn btn-warning btn-lg" role="button"><span className="glyphicon glyphicon-bookmark" /> <br />Bookmarks</a>
            <a href="#" className="btn btn-primary btn-lg" role="button"><span className="glyphicon glyphicon-signal" /> <br />Reports</a>
            <a href="#" className="btn btn-primary btn-lg" role="button"><span className="glyphicon glyphicon-comment" /> <br />Comments</a>
          </div>
          <div className="col-xs-6 col-lg-6">
            <a href="#" className="btn btn-success btn-lg" role="button"><span className="glyphicon glyphicon-user" /> <br />Users</a>
            <a href="#" className="btn btn-info btn-lg" role="button"><span className="glyphicon glyphicon-file" /> <br />Notes</a>
            <a href="#" className="btn btn-primary btn-lg" role="button"><span className="glyphicon glyphicon-picture" /> <br />Photos</a>
            <a href="#" className="btn btn-primary btn-lg" role="button"><span className="glyphicon glyphicon-tag" /> <br />Tags</a>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</div>


            </div>
        );
    }
}

export default Adminbody;