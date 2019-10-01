import React from 'react';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { Button } from 'semantic-ui-react'


const NavBar = (props) => {

        return (
              <Container style={{ textAlign: 'center'}} maxWidth="sm">
                <br/> 
                <Button color='black' style={{ margin: '20px', fontFamily: 'Permanent Marker', fontWeight: 'lighter', minWidth: 200, maxHeight: '30px', padding: '5px'}} onClick={() => props.handleLoginSignupClicked()} as={Link} to="/signup" exact >Sign up</Button>
               
                <Button color='black' style={{ margin: '20px', fontFamily: 'Permanent Marker', fontWeight: 'lighter', minWidth: 200, maxHeight: '30px', padding: '5px'}} onClick={() => props.handleLoginSignupClicked()} as={Link} to="/login" exact >Login</Button>
                <br/>
              </Container>
             
        );
    // }
}

export default NavBar;