import React, { Component } from 'react';
import '../css/Scrollable.css';

class Scrollable extends Component {
    render() {
        return (
            
            <div className="fix-my-height">
               {this.props.children} 
            </div>
        );
    }
}

export default Scrollable;