import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Component, useEffect} from "react/cjs/react.production.min";
import Main from "./components/MainComponent"
import {BrowserRouter} from "react-router-dom";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <div>
                    <Main/>
                </div>
            </BrowserRouter>
        </>
    );
}
