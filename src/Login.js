import React from 'react';
// import Button from '@material-ui/core/Button';


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
        <form onSubmit={() => this.props.handleSubmit(this.state)}>
            <label>Email</label>
            <br/>
            <input value={this.state.email} onChange={this.handleChangeEmail} placeholder='Email' />
            <br/>
            <label>Password</label>
            <br/>
            <input type='password' value={this.state.password} onChange={this.handleChangePassword} placeholder='Password' />
            <br/>
            <button type='submit'>Login</button>
        </form>
    );
};
}

export default Login;