import React from 'react';
import './user.css';


function User(props) {
    return (
        <div className="m-2 bg-white rounded p-2 border d-flex flex-row justify-content-between align-items-center itemUsuario">
            <div className="d-flex align-items-center">
                <i className="material-icons rounded-circle bg-light p-2 mx-2" style={{color: "#6975668f"}}>person</i>
                <span>{props.apellidos + " " +props.nombres}</span>
            </div>
            <i className="material-icons mr-2" style={{color: ((props.online)? "#39b31b8f" : "#b31b1b8f")}}>fiber_manual_record</i>
        </div>
    );
}

export default User;
