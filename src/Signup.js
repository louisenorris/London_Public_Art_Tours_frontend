import React from 'react';
import { Button } from 'semantic-ui-react'


class Signup extends React.Component {

    state = {
        username: "",
        email: "",
        password: ""
    }

    handleChangeUsername = (event) => {
        this.setState({username: event.target.value})
    }

    handleChangeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    handleChangePassword = (event) => {
        this.setState({password: event.target.value})
    }


    render() {
    return (
     <>
        <h2 className="introlight">Sign up to begin your journey</h2>
        <form onSubmit={() => this.props.handleSubmit(this.state)}>
            <br/>
            <input className="loginSignup" value={this.state.username} onChange={this.handleChangeUsername} placeholder='Username' />
            <br/>
            <input className="loginSignup" value={this.state.email} onChange={this.handleChangeEmail} type="email" placeholder='Email' />
            <br/>
            <input className="loginSignup" value={this.state.password} onChange={this.handleChangePassword} type='password' placeholder='Password' />
            <br/>
            <Button style={{maxHeight: '30px', padding: '5px'}} color='black' type='submit'>Sign up</Button>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
     </>
    );
    }
};

export default Signup;
