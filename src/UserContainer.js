import React, { Component } from 'react';
import EditUser from './EditUser';
import AccountDetails from './AccountDetails';

class UserContainer extends Component {

    state = {
        editClicked: false
      }
    
      handleEditClick = () => {
        this.setState({editClicked: !this.state.editClicked})
      }

    renderContent = () => {
        if (this.props.user && this.state.editClicked) {
            return <EditUser user={this.props.user} handleEditSubmit={this.props.updateUser} handleEditClick={this.handleEditClick}/>
        } else if (this.props.user) {
            return <AccountDetails user={this.props.user} handleEditClick={this.handleEditClick} deleteUser={this.props.deleteUser} handleShowTourOnMap={this.props.handleShowTourOnMap} artworks={this.props.artworks} showAllArtworks={this.props.showAllArtworks} logOut={this.props.logOut}/>
        } else {
            return <p>user undefined</p>
        }
    }


    render() {
        return (
            <div>
                {this.renderContent()}     
            </div>
        );
    }
}

export default UserContainer;