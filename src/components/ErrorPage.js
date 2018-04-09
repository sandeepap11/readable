import React, { Component } from 'react';
import '../css/ErrorPage.css';

class ErrorPage extends Component {

  render() {

    const {message} = this.props;
    let errorMessage = "";

    if(message === undefined)
    errorMessage = "The requested page does not exist";
    else
    errorMessage = message;
    
    return (

      <div className="no-results">
              <p><span className="page-not-found">404 Error:</span> {errorMessage}   </p>
      </div>
    )

  }
}

export default ErrorPage;
