import React, { Component } from 'react';

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
            <form onSubmit={(e) => this.props.handleEditSubmit(e, this.state)}>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
            <div>
              <input type="submit" value="Save" />
              {/* <button onClick={this.props.handleCancel} type="button">Delete Account</button> */}
            </div>
          </form>
        );
    }
}

export default EditUser;