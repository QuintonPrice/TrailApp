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
        // const trailInfo = this.props.trailInfo[0];

    }

    handleClose() {
        this.setState({
            show: false,
        });
    }

    render() {
        return (
            <Modal show={this.props.showTrailModal} onHide={() => this.props.closeTrailModal()} size="xl">
                <Modal.Header>
                    <Modal.Title>{this.props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.description}</p>
                    <p><b>More will be added to this modal later!</b></p>
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