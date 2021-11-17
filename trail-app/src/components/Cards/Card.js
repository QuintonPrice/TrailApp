// Card component

import React, { Component } from 'react';
import "./card.css";

class Card extends Component {
    render() {
        return (
                <div className="card">
                    <img className="card-img-top" alt="" src="https://s24953.pcdn.co/blog/wp-content/uploads/2018/01/Templates-Guide-header-1-1024x576.png" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.trailName}</h5>
                        <p className="card-text"><b>Location: </b>{this.props.trailLocation}</p>
                        <p className="card-text"><b>Category: </b>{this.props.trailType}</p>
                        <p className="card-text"><b>Description: </b>{this.props.trailDescription}</p>
                    </div>
                </div>
        )
    }
}

export default Card;