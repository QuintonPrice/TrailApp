// Home page
import React, { Component } from 'react';
import './trails.css';

class Trails extends Component {    
    render() {
        return (
            <div id="info-div">
                <h1>Trails Page</h1>
                <div id="info" className="container rounded border shadow">
                    <form onSubmit={(e) => this.props.handleSubmit(e)}>
                        <input type="text" name="trailName" placeholder="Trail name" onChange={(e) => this.props.handleChange(e)}/>
                        <input type="text" name="trailLocation" placeholder="Trail location" onChange={(e) => this.props.handleChange(e)} />
                        <button id="create-trail-button" type="submit" className="btn btn-md btn-outline-warning" >Create New Trail</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Trails;