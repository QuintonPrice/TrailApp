// TrailModal component
import React, { Component } from 'react';
import './trailmodal.css';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

// trail modal class
class TrailModal extends Component {

    constructor() {
        super();
        this.state = {
            show: true,
        }
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            show: false,
        });
    }

    render() {
        return (
            <Modal show={this.props.showTrailModal} onHide={() => this.props.closeTrailModal()} size="md">
                <Modal.Header>
                    <Modal.Title>{this.props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="card-img-top" alt="" src="https://i.imgur.com/TmCDuqf.jpg" />
                    <hr></hr>
                    <p><b>Location: </b>{this.props.location} </p>
                    <p><b>Trail Type: </b>{this.props.type}</p>
                    <p><b>Added By: </b>{this.props.username}</p>
                    <p><b>Description: </b>{this.props.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.closeTrailModal()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default TrailModal;