// Card component

import React, { Component } from 'react';
import "./card.css";

class Card extends Component {
    render() {
        return (
            <div className="card-deck">
                <div className="card">
                    <img className="card-img-top" alt="" src="https://s24953.pcdn.co/blog/wp-content/uploads/2018/01/Templates-Guide-header-1-1024x576.png"/>
                    <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">This is a longer card test. This is a longer card test. This is a longer card test.</p>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" alt="" src="https://s24953.pcdn.co/blog/wp-content/uploads/2018/01/Templates-Guide-header-1-1024x576.png"/>
                    <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">This is a longer card test. This is a longer card test. This is a longer card test.</p>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" alt="" src="https://s24953.pcdn.co/blog/wp-content/uploads/2018/01/Templates-Guide-header-1-1024x576.png"/>
                    <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">This is a longer card test. This is a longer card test. This is a longer card test.</p>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" alt="" src="https://s24953.pcdn.co/blog/wp-content/uploads/2018/01/Templates-Guide-header-1-1024x576.png"/>
                    <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">This is a longer card test. This is a longer card test. This is a longer card test.</p>
                    </div>
                </div>
            </div>
        )

    }
}

export default Card;