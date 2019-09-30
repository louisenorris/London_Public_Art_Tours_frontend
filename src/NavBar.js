import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import { flexbox } from '@material-ui/system';
import Container from '@material-ui/core/Container';

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
      backgroundColor: grey[900],
    },
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minWidth: 100,
  },
}));

// class NavBar extends Component {

const NavBar = (props) => {

  const classes = useStyles();
    // render() {
        return (
              <Container style={{ textAlign: 'center'}} maxWidth="sm">
                <br/> 
                <ColorButton onClick={() => props.handleLoginSignupClicked()} variant="contained" color="accent" className={classes.margin} component={Link} to="/signup" exact >
                      Sign up
                </ColorButton>
               
               
                <ColorButton onClick={() => props.handleLoginSignupClicked()} variant="contained" color="accent" className={classes.margin} component={Link} to="/login" exact >
                      Login
                </ColorButton>
                <br/>
              </Container>
        );
    // }
}

export default NavBar;