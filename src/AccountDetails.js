import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class AccountDetails extends Component {
    render() {
        return (
            <div>
                {
                    this.props.user ? 
                    <>
                    <h3>User details</h3>
                    <p>{`Username: ${this.props.user.username}`}</p>
                    <p>{`Email: ${this.props.user.email}`}</p>

                    {
                    this.props.user.tours.map(tour => 
                        <>
                        <li>{tour.name}</li>
                        <button onClick={() => this.props.handleShowTourOnMap(tour.id)} >
                        <NavLink to="/" exact>
                            Get directions
                        </NavLink>
                        </button>
                        </>)
                    }
                    <button onClick={this.props.handleEditClick}>Edit user</button>
                    <button onClick={() => this.props.deleteUser(this.props.user.id)}>Delete account</button>
                    </>
                    : null
                }
            </div>
        );
    }
}

export default AccountDetails;