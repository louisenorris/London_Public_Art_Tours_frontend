import React from 'react';
import { Button } from 'semantic-ui-react'

class Login extends React.Component {

    state = {
        email: "",
        password: ""
    }

    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    handleChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

render(){
    return (
        <>
        <h2 className="introlight">Welcome back!</h2>
        <h2 className="introlight">Log in to continue the adventure</h2>
        <form onSubmit={() => this.props.handleSubmit(this.state)}>
        
            <input className="loginSignup" value={this.state.email} onChange={this.handleChangeEmail} placeholder='Email' />
            <br/>
            <input className="loginSignup" type='password' value={this.state.password} onChange={this.handleChangePassword} placeholder='Password' />
            <br/>
            <Button style={{maxHeight: '30px', padding: '5px'}} color='black' type='submit'>Login</Button>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* <img style={{position: 'relative', width: '100%', bottom: "2.5%"}} className="center" src={require("./london-skyline-isolated-big-hi.png")} alt="london"/> */}

        </>
    );
};
}

export default Login;