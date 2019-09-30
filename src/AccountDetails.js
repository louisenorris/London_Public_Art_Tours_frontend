import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Button, Image, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

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

                    <Button color='black' onClick={this.props.handleEditClick} >Edit user</Button>
                    <Button color='black' onClick={() => this.props.deleteUser(this.props.user.id)} >Delete account</Button>

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
                <br/>
                <Button.Group widths="3" color='black'>
                  <Button as={Link} to="/tours" exact ><Icon name="map" /></Button>
                  <Button onClick={() => this.props.showAllArtworks()} as={Link} to="/" exact ><Icon name="home" /></Button>
                  <Button onClick={this.props.logOut} ><Icon name="sign-out" /></Button>
                </Button.Group>
            </div>
        );
    }
}

export default AccountDetails;