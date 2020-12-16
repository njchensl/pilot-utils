import React from "react";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-4">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <div className="row">
                                <div className="col-sm"><li><Link to="/home">Home</Link></li></div>
                                <div className="col-sm"><li><Link to="/about">About</Link></li></div>
                                <div className="col-sm"><li><Link to="/utilities">Utilities</Link></li></div>
                                <div className="col-sm"> <li><Link to="/contact">Contact</Link></li></div>
                            </div>
                        </ul>
                    </div>
                    {/*<div className="col-7 col-sm-5">*/}
                    {/*    <h5>Our Address</h5>*/}
                    {/*    <address>*/}
                    {/*        121, Clear Water Bay Road<br/>*/}
                    {/*        Clear Water Bay, Kowloon<br/>*/}
                    {/*        HONG KONG<br/>*/}
                    {/*        <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br/>*/}
                    {/*        <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br/>*/}
                    {/*        <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">*/}
                    {/*        confusion@food.net</a>*/}
                    {/*    </address>*/}
                    {/*</div>*/}
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-facebook"
                               href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i
                                className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i
                                className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i
                                className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2020 Hongjun Chen</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
