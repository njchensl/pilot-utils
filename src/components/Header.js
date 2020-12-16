import React, {Component} from "react";
import {Navbar, NavbarBrand, Jumbotron, Nav, NavItem, Collapse, NavbarToggler} from 'reactstrap';
import {NavLink} from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="ml-0 mr-md-5" href="/">Private Pilot Utilities</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg" /> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/utilities">
                                        <span className="fa fa-list fa-lg" /> Utilities
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contact">
                                        <span className="fa fa-telegram fa-lg" /> Contact
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                {/*<Jumbotron>*/}
                {/*    <div className="container">*/}
                {/*        <div className="row row-header">*/}
                {/*            <div className="col-12 col-sm-6">*/}
                {/*                <h1>H1 Title</h1>*/}
                {/*                <p>Description</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Jumbotron>*/}
            </>
        );
    }
}
