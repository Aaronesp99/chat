import React from 'react';
// import './user.css';


function Message(props) {
    return (
        (props.user == "me") ?
            <div className="align-self-end p-2 my-2 mr-1" style={{borderRadius: "10px 0px 10px 10px", background: "#90d47f"}}>
                {props.mensaje}
            </div>
            :
            <div className="align-self-start p-2 my-2 ml-1" style={{borderRadius: "0px 10px 10px 10px", background: "#eaeaea"}}>
                {props.mensaje}
            </div>
    );
}

export default Message;
