import React from 'react';
// import './user.css';


function Message(props) {
    return (
        (props.user === "me") ?
            <div className="align-self-end d-flex flex-row my-2 mr-1" >
                <span className="py-2 px-3" style={{borderRadius: "10px 0 10px 10px", background: "#90d47f"}}>{props.mensaje}</span>
                <div style={{width: 0, height: 0, borderTop: "solid 7px #90d47f", borderRight: "solid 5px transparent"}}></div>
            </div>
            :
            <div className="align-self-start d-flex flex-row my-2 ml-1">
                <div style={{width: 0, height: 0, borderTop: "solid 7px #eaeaea", borderLeft: "solid 5px transparent"}}></div>
                <span className="py-2 px-3" style={{borderRadius: "0 10px 10px 10px", background: "#eaeaea"}}>{props.mensaje}</span>
            </div>
    );
}

export default Message;
