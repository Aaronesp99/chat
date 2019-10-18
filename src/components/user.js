import React from 'react';
import './user.css';


class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            onlineUsers : this.props.onlineUsers
        }

        this.usersOnline = this.usersOnline.bind(this);
    }
    componentDidMount(){
        const {websocket}=this.props;
        websocket.onmessage = (e) => {
            var message = JSON.parse(e.data);
            this.usersOnline(message);
        }
    }

    usersOnline(message){
        if(message.type === "onlineUsers"){
            var usuarios = message.data;
            this.setState({onlineUsers: this.state.onlineUsers.map((value)=>{
                value.online = false;
                Object.values(usuarios).forEach(element => {
                   if(element === value.id){
                        value.online = true;
                        return;   
                   }
                });
                return value;
            })})
        }
    }

    render(){
        const {onlineUsers} = this.state;
        return (
            onlineUsers.map((element)=>{
                return(
                    (element.id !== this.props.me) &&
                    
                    <div className="m-2 bg-white rounded p-2 border d-flex flex-row justify-content-between align-items-center itemUsuario" key={element.id}>
                        <div className="d-flex align-items-center">
                            <i className="material-icons rounded-circle bg-light p-2 mx-2" style={{color: "#6975668f"}}>person</i>
                            <span>{element.apellidos + " " +element.nombres}</span>
                        </div>
                        <i className="material-icons mr-2" style={{color: ((element.online)? "#39b31b8f" : "#b31b1b8f")}}>fiber_manual_record</i>
                    </div>
                )
            })

        );
    }
}

export default User;
