// Card component

import React, { Component } from 'react';
import "./card.css";

class Card extends Component {
    render() {
        return (
            <div className="card-deck">
                <div className="card">
                    <img className="card-img-top" src="https://blog.corp-site.envato.com/cdn-cgi/image/width=1200,quality=85,format=auto/uploads/2020/06/SOC101_Portfolio_Guide.png"/>
                    <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">This is a longer card test. This is a longer card test. This is a longer card test.</p>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src="https://blog.corp-site.envato.com/cdn-cgi/image/width=1200,quality=85,format=auto/uploads/2020/06/SOC101_Portfolio_Guide.png"/>
                    <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">This is a longer card test. This is a longer card test. This is a longer card test.</p>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src="https://blog.corp-site.envato.com/cdn-cgi/image/width=1200,quality=85,format=auto/uploads/2020/06/SOC101_Portfolio_Guide.png"/>
                    <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">This is a longer card test. This is a longer card test. This is a longer card test.</p>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src="https://blog.corp-site.envato.com/cdn-cgi/image/width=1200,quality=85,format=auto/uploads/2020/06/SOC101_Portfolio_Guide.png"/>
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