import React from 'react';


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
        <h2 className="intro">Welcome back!</h2>
        <h2 className="intro">Log in to continue the adventure</h2>
        <form onSubmit={() => this.props.handleSubmit(this.state)}>
        
            <input className="loginSignup" value={this.state.email} onChange={this.handleChangeEmail} placeholder='Email' />
            <br/>
            <input className="loginSignup" type='password' value={this.state.password} onChange={this.handleChangePassword} placeholder='Password' />
            <br/>
            <button className="Button" type='submit'>LOGIN</button>
        </form>
        </>
    );
};
}

export default Login;