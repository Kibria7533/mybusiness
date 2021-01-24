import React, { Component } from 'react';

class Showmessege extends Component {
    render() {
        return (
            <div className="error-404">
  <div className="error-code m-b-10 m-t-20">Wellcome</div>
  <h2 className="font-bold">We have send you a recovery email with username.</h2>
  <div className="error-desc">
    Please check within a day
    <div><br />
      {/* <a class=" login-detail-panel-button btn" href="http://vultus.de/"> */}
      <a href="/" className="btn btn-primary"><span className="glyphicon glyphicon-home" /> Go back to Homepage</a>
    </div>
  </div>
</div>

        );
    }
}

export default Showmessege;