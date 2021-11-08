// Home page
import React, { Component } from 'react';
import './trails.css';

class Trails extends Component {
    render() {
        return (
            <div id="info-div">
                <h1>Trails Page</h1>
                <button id="create-trail-button" type="button" className="btn btn-md btn-outline-warning">Create New Trail</button>
                <div id="info" className="container rounded border shadow">
                    <p>Trails testing</p>
                </div>
            </div>
        )
    }
}

export default Trails;