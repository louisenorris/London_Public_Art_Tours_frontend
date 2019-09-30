import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Button, Image } from 'semantic-ui-react'

class AccountDetails extends Component {
    render() {
        return (
            <div>
                {
                    this.props.user ? 
                    <>
                    <h2 className="intro">Account details</h2>
                    <span className="bold">Username: </span><span>{this.props.user.username}</span>
                    <br/>
                    <br/>
                    <span className="bold">Email: </span><span>{this.props.user.email}</span>
                    <br/>
                    <br/>
                    <Button.Group widths="2" color='black'>
                    <Button onClick={this.props.handleEditClick} >Edit user</Button>
                    <Button onClick={() => this.props.deleteUser(this.props.user.id)} >Delete account</Button>
                    </Button.Group>
                    {/* <button onClick={this.props.handleEditClick}>Edit user</button> */}
                    {/* <button onClick={() => this.props.deleteUser(this.props.user.id)}>Delete account</button> */}

                    <h2 className="intro">Your tours</h2>
                    {
                    this.props.user.tours.map(tour => 
                        <>
                        <Image avatar bordered alt="map avatar" src={require(`./london_avatar.png`)}/>
                        <span className="menu">{tour.name}</span>
                        <button onClick={() => this.props.handleShowTourOnMap(tour.id)} >
                        <NavLink to="/" exact>
                            Get directions
                        </NavLink>
                        </button>
                        <br/>
                        </>)
                    }
                    </>
                    : null
                }
            </div>
        );
    }
}

export default AccountDetails;