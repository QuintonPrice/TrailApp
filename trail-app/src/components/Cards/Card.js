// Card component

import React, { Component } from 'react';
import "./card.css";

class Card extends Component {
    render() {
        return (
                <div className="card">
                    <img className="card-img-top" alt="" src="https://i.imgur.com/TmCDuqf.jpg" />
                    <div className="card-body">
                        <h5 className="card-title"><b>{this.props.trailName}</b></h5>
                        <p className="card-text"><b>Added By: </b>{this.props.username}</p>
                        <p className="card-text"><b>Location: </b>{this.props.trailLocation}</p>
                        <p className="card-text"><b>Category: </b>{this.props.trailType}</p>
                        <p className="card-text"><b>Description: </b>{this.props.trailDescription}</p>
                    </div>
                </div>
        )
    }
}

export default Card;