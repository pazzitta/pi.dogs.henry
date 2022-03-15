import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

export default function LandingPage () {
    return (
        <div className="landing">
            <div>
                <Link to='/home' id="click">
                  <button className="buttonInicio">INICIO</button>
                </Link>
            </div>
            
        </div>
    )
}