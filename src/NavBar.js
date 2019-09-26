import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <div>
                 <>
                <button className="nav">
                    <NavLink to="/signup" exact>
                      Sign up
                    </NavLink>
                </button>

                <button className="nav">
                    <NavLink to="/login" exact>
                      Login
                    </NavLink>
                </button>
                <br/>
              </>
                
            </div>
        );
    }
}

export default NavBar;