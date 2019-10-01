import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class EditUser extends Component {

    state = {
        id: null,
        username: "",
        email: ""
      }

      componentDidMount() {
          this.setState({
            id: this.props.user.id,
            username: this.props.user.username,
            email: this.props.user.email
          })
      }
    
      handleChange = (event) => {
        // event.preventDefault()
        //   debugger
        this.setState({
          [event.target.name]: event.target.value
        })
        console.log(event.target.value)
        console.log(this.state)
      }


    render() {
        return (
          <>
          <h2 className="introlight">Edit your details below</h2>
            <form onSubmit={(e) => this.props.handleEditSubmit(e, this.state)}>
            <label>Username:</label>
            <input className="loginSignup" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            <label>Email:</label>
            <input className="loginSignup" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
            <div>
              {/* <input type="submit" value="Save" /> */}
              <Button style={{maxHeight: '30px', padding: '5px'}} color='black' size='small' type='submit'>Save</Button>
              <Button style={{maxHeight: '30px', padding: '5px'}} color='black' size='small' onClick={this.props.handleEditClick} >Cancel</Button>
              {/* <button onClick={this.props.handleCancel} type="button">Delete Account</button> */}
            </div>
          </form>
          </>
        );
    }
}

export default EditUser;