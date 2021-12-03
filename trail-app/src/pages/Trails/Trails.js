// Home page
import React, { Component, /*useEffect*/ } from 'react';
import './trails.css';

import Card from "../../components/Cards/Card.js";
//import { Link } from 'react-router-dom'; // imports link functionality
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import TrailModal from "../../components/TrailModal/TrailModal.js";
import { ref, remove } from 'firebase/database'; // used to  modify database
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class Trails extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            submitted: false,
            showTrailModal: false,
            showCards: true
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.loadTrailModal = this.loadTrailModal.bind(this);
        this.closeTrailModal = this.closeTrailModal.bind(this);
    }

    handleClose() {
        this.setState({
            show: false,
            submitted: false
        });
    }

    closeTrailModal() {
        this.setState({
            showTrailModal: false
        });
    }

    handleShow() {
        this.setState({
            show: true
        });
    }

    loadTrailModal(itemID) {
        const trail = this.props.trailList.find(element => element.id === itemID.id);
        console.log(trail);
        this.setState({
            showTrailModal: true,
            modalName: trail.trailName,
            modalLocation: trail.trailLocation,
            modalType: trail.trailType,
            modalDescription: trail.trailDescription,
            modalUsername: trail.username
        });
    }

    removeItem(itemID, userID) {
        if (userID === this.props.userID) {
            console.log("Item: " + itemID + "removed");
            var itemRef = ref(this.props.database, 'trails/' + itemID);
            remove(itemRef);
        } else {
            alert("You do not have permission to delete this trail!");
        }
    }

    render() {
        return (
            <div id="trails-div">
                {this.props.loggedIn ?
                    <button onClick={this.handleShow} id="add-trail-button" className="btn btn-lg btn-warning shadow">+ Add New Trail</button>
                    :
                    <button disabled onClick={this.handleShow} id="add-trail-button" className="btn btn-lg btn-warning shadow">+ Add New Trail</button>
                }

                {this.props.loggedIn ?
                    <span></span>
                    :
                    <div id="loggedInAlert" className="alert alert-warning" role="alert">Users cannot add trails unless logged in!</div>
                }
                <Modal show={this.state.show} onHide={this.handleClose} size="xl">
                    <Modal.Header>
                        <Modal.Title>Add New Trail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.submitted ?
                            <div id="successMessage" className="alert alert-success" role="alert">Success! Trail added</div>
                            :
                            <span></span>
                        }
                        <form onSubmit={(e) => this.props.handleSubmit(e)}>
                            <label htmlFor="trailNameInput" className="form-label font-weight-bold">Enter trail name:</label>
                            <input id="trailNameInput" required className="trail-input form-control form-control-lg" type="text" name="trailName" placeholder="Name" onChange={(e) => this.props.handleChange(e)} />

                            <label htmlFor="trailTypeInput">What type of trail is it?</label>
                            <select defaultValue="" id="trailTypeInput" required className="text-dark trail-input form-control form-control-sm" name="trailType" onChange={(e) => this.props.handleChange(e)}>
                                <option value="" >Choose type</option>
                                <option value="Hiking">Hiking</option>
                                <option value="Mountain Bike">Mountain Biking</option>
                                <option value="Trail Running">Trail Running</option>
                                <option value="Backpacking">Backpacking</option>
                                <option value="Climbing Route">Climbing Route</option>
                            </select>

                            <label htmlFor="trailLocationInput">Where's the trail located?</label>
                            <input id="trailLocationInput" required className="text-dark trail-input form-control form-control-sm" type="text" name="trailLocation" placeholder="Location" onChange={(e) => this.props.handleChange(e)} />

                            <label htmlFor="trailDescriptionInput">Finally, give the trail a description:</label>
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
                    <button type="button" className="view-select-button btn btn-sm btn-secondary" onClick={() => this.setState({ showCards: true })}>
                        Card View
                    </button>
                    <button type="button" className="view-select-button btn btn-sm btn-secondary" onClick={() => this.setState({ showCards: false })}>
                        List View
                    </button>
                    {this.state.showCards ?
                        <div className="card-deck row">
                            {this.props.trailList.map((item) => {
                                return (
                                    <div className="col-lg-4 card-col">
                                        <Card
                                            className="trailCard"
                                            trailName={item.trailName}
                                            trailType={item.trailType}
                                            trailDescription={item.trailDescription}
                                            trailLocation={item.trailLocation}
                                            username={item.username}
                                            itemID={item.id}
                                            userIDState={this.props.userID}
                                            userIDItem={item.userID}
                                            removeItem={this.removeItem}
                                        />
                                        {/* {this.props.userID === item.userID ?
                                            <button onClick={() => { if (window.confirm("Are you sure you wish to delete this trail?")) this.removeItem(item.id, item.userID) }}>Remove item</button>
                                            :
                                            <span></span>
                                        } */}
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div>
                            <table className="table table table-striped table-hover">
                                <thead>
                                    <tr key="header">
                                        <th scope="col"></th>
                                        <th scope="col">Manage</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Trail Type</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Added By</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.trailList.map((item) => {
                                        return (
                                            <tr key={item.id} >
                                                <th scope="row"></th>
                                                <td>
                                                    <DropdownButton size="sm" color="link" id="dropdown-basic-button" title="">
                                                        <Dropdown.Item disabled={!(this.props.userID === item.userID)} onClick={() => { if (window.confirm("Are you sure you wish to delete this trail?")) this.props.removeItem(this.props.itemID, this.props.userIDItem) }}>Remove Item</Dropdown.Item>
                                                        <Dropdown.Item disabled href="#/action-2">Edit</Dropdown.Item>
                                                    </DropdownButton>
                                                </td>
                                                <td>{item.trailName}</td>
                                                <td>{item.trailType}</td>
                                                <td>{item.trailLocation}</td>
                                                <td>{item.username}</td>
                                                <td><button id="see-more-btn" className="button btn-sm btn-warning btn" onClick={() => this.loadTrailModal(item)}>See more</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <TrailModal
                                name={this.state.modalName}
                                username={this.state.modalUsername}
                                location={this.state.modalLocation}
                                type={this.state.modalType}
                                description={this.state.modalDescription}
                                closeTrailModal={this.closeTrailModal}
                                showTrailModal={this.state.showTrailModal}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Trails;