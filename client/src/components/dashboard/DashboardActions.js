import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <img src='./img/user-circle-solid.svg' alt='user circle icon'/> Edit Profile</Link>
            <Link to="/add-experience" className="btn btn-light">
                <img src='./img/black-tie.svg' alt='black tie icon'/> Add Experience</Link>
            <Link to="/add-education" className="btn btn-light">
                <img src='./img/graduation-cap-solid.svg' alt='graduation cap icon'/> Add Education</Link>
        </div>
    )
}

export default DashboardActions;
