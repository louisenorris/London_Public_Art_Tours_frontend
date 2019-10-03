import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class AccountDetails extends Component {
    render() {
        return (
            <div >
                <div style={{overflow: 'scroll', height: '56em'}} >
                {
                    this.props.user ? 
                    <>
                    <h2 className="introlight">Account details</h2>
                    <span className="bold">Username: </span><span>{this.props.user.username}</span>
                    <br/>
                    <br/>
                    <span className="bold">Email: </span><span>{this.props.user.email}</span>
                    <br/>
                    <br/>

                    <Button color='black' style={{maxHeight: '30px', padding: '5px'}} onClick={this.props.handleEditClick} >Edit user</Button>
                    <Button color='black' style={{maxHeight: '30px', padding: '5px'}} onClick={() => this.props.deleteUser(this.props.user.id)} >Delete account</Button>

                   
                    <br/>
                    <h2 className="introlight">Your tours</h2>
                    {
                    this.props.user.tours.map(tour => 
                        <>
                        <Icon name="map outline" />
                        <span>{tour.name}</span>
                        <br/>
                        <Button color='black' style={{maxHeight: '30px', padding: '5px', margin: '2px'}} onClick={() => this.props.handleShowTourOnMap(tour.id)} as={Link} to="/" exact >Get directions</Button>
                        <br/>
                        <br/>
                        </>)
                    }
                    </>
                    : null
                }
                <br/>
                </div>
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