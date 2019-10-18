import React from 'react';
import './App.css';
import User from './components/user.js';
import Message from './components/message.js';
import users from './data/usuarios.json';

class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onlineUsers: users,
      me: ""
    }
    this.conn = new WebSocket('ws://localhost:8080');
    this.ready();
    // this.ready();
  }

  ready(){
    window.onload = () => {
      const usuario = prompt("¿Quién eres?");
      if(usuario){
        this.setState({me: usuario})
        var conn = new WebSocket('ws://localhost:8080');
        const login = {action: "login", usuario: usuario};
    
        conn.onopen = function(e) {
          console.log("Connection established!");
          conn.send(JSON.stringify(login));
        };
        }
    }
  }

  render(){
    const {onlineUsers, me} = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-3 col-12 d-flex flex-column vh-100">
                <h3 className="text-center my-4 text-muted"><i className="material-icons mx-2 align-middle" style={{fontSize: "1.05em"}}>people_alt</i>USUARIOS</h3>
                  <User websocket={this.conn} onlineUsers={onlineUsers} me={me} />
                <div className="mb-3 mt-auto" style={{cursor: "pointer"}}>
                  <div className="px-3 py-2 text-center m-auto border text-muted w-75" style={{borderRadius: "15px"}}>
                    <span className="font-weight-bold">Cerrar Sesión</span>
                    <i className="material-icons align-middle mx-2">power_settings_new</i>
                  </div>
                </div>
            </div>

            <div className="col-md-9 col-12 p-0">
                <div>
                  <div className="border p-1" style={{height: "6vh"}}>
                    <div className="d-flex flex-row h-100 align-items-center justify-content-center">
                      <i className="material-icons mx-2" style={{color: "#90d47f", cursor: "pointer"}}>fiber_manual_record</i>
                      <span className="font-weight-bold text-uppercase text-muted" style={{letterSpacing: "0.5px"}}>Espinoza Ilizarbe Aaron</span>
                    </div>
                  </div>
                  <div className="border p-1" style={{height: "85vh"}}>
                    <div className="d-flex flex-column">
                      <Message mensaje="Hola!" user="me"/>
                      <Message mensaje="Como te va?!" user="me"/>
                      <Message mensaje="Bien y tu?!"/>
                    </div>
                  </div>
                  <div className="border d-flex flex-row align-items-center" style={{height: "9vh"}}>
                    <textarea className="w-100 border-0 px-3 py-2 h-100 form-control txtMessage" placeholder="Escribe un mensaje" style={{resize: "unset"}}></textarea>
                    <div className="mx-3 mr-4">
                      <i className="material-icons text-muted p-3 rounded-circle bg-light" style={{fontSize: "1.8em", cursor: "pointer"}}>near_me</i>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default App;
