// Home page
import React, { Component, /*useEffect*/ } from 'react';
import './trails.css';

import Card from "../../components/Cards/Card.js";
//import { Link } from 'react-router-dom'; // imports link functionality
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

class Trails extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            submitted: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose() {
        this.setState({
            show: false,
            submitted: false
        });
    }

    handleShow() {
        this.setState({
            show: true
        });
    }

    render() {
        const submitted = this.props.submitted;
        let successMessage;
        if (submitted) {
            successMessage = <div id="successMessage" className="alert alert-success" role="alert">Success! Trail added</div>
        } else {
            successMessage = <span></span>
        }
        
        return (
            <div id="trails-div">
                <button onClick={this.handleShow} id="add-trail-button" className="btn btn-lg btn-warning shadow">+ Add New Trail</button>
                <Modal show={this.state.show} onHide={this.handleClose} size="xl">
                    <Modal.Header>
                        <Modal.Title>Add New Trail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {successMessage}
                        <form onSubmit={(e) => this.props.handleSubmit(e)}>
                            <label for="trailNameInput" className="form-label font-weight-bold">Enter trail name:</label>
                            <input id="trailNameInput" required className="trail-input form-control form-control-lg" type="text" name="trailName" placeholder="Name" onChange={(e) => this.props.handleChange(e)} />
                            
                            <label for="trailTypeInput">What type of trail is it?</label>
                            <select id="trailTypeInput" required className="text-dark trail-input form-control form-control-sm" name="trailType" onChange={(e) => this.props.handleChange(e)}>
                                <option value="" selected>Choose type</option>
                                <option value="Hiking">Hiking</option>
                                <option value="Mountain Bike">Mountain Biking</option>
                                <option value="Trail Running">Trail Running</option>
                                <option value="Backpacking">Backpacking</option>
                                <option value="Climbing Route">Climbing Route</option>
                            </select>

                            <label for="trailLocationInput">Where's the trail located?</label>
                            <input id="trailLocationInput" required className="text-dark trail-input form-control form-control-sm" type="text" name="trailLocation" placeholder="Location" onChange={(e) => this.props.handleChange(e)} />
                            
                            <label for="trailDescriptionInput">Finally, give the trail a description:</label>
                            <textarea id="trailDescriptionInput" required className="text-dark trail-input form-control" rows="3" type="text" name="trailDescription" placeholder="Description" onChange={(e) => this.props.handleChange(e)} />

                            <button id="create-trail-button" type="submit" onClick={this.handleCreate} className="btn btn-md btn-outline-warning">Create New Trail</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div id="trails" className="container rounded border shadow">
                    <Card className="trailCard" />
                </div>
            </div>
        )
    }
}

export default Trails;