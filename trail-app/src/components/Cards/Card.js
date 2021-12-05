// Card component

import React, { Component } from 'react';
import "./card.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Card extends Component {

    render() {
        return (
            <div className="card scroll h-100">
                <img className="card-img-top" alt="" src="https://i.imgur.com/TmCDuqf.jpg" />
                <div className="card-body">
                    <h5 className="card-title"><b>{this.props.trailName}</b></h5>
                    <p className="card-text"><b>Added By: </b>{this.props.username}</p>
                    <p className="card-text"><b>Location: </b>{this.props.trailLocation}</p>
                    <p className="card-text"><b>Category: </b>{this.props.trailType}</p>
                    <p className="card-text"><b>Description: </b>{this.props.trailDescription}</p>
                    <DropdownButton className="align-self-end" drop="up" variant="primary" size="sm" color="link" id="dropdown-basic-button" title="">
                        <Dropdown.Item disabled={!(this.props.userIDState === this.props.userIDItem || this.props.isAdmin)} onClick={() => { if (window.confirm("Are you sure you wish to delete this trail?")) this.props.removeItem(this.props.itemID, this.props.userIDItem) }}>Remove Item</Dropdown.Item>
                        <Dropdown.Item disabled>Edit</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        )
    }
}

export default Card;