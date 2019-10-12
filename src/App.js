import React from 'react';
import './App.css';
import User from './components/user.js';
import users from './data/usuarios.json';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
          <div className="col-md-3 col-12">
              <h3 className="text-center my-4 text-muted"><i className="material-icons mx-2 align-middle" style={{fontSize: "1.05em"}}>people_alt</i>USUARIOS</h3>
              {
                users.map(function(val, index){
                  return(
                    <User nombres={val.nombres} apellidos={val.apellidos} online={val.online} key={val.id}/>
                  )
                })
              }
          </div>

          <div className="col-md-9 col-12 p-0">
              <div>
                <div className="border p-1" style={{height: "6vh"}}>Header</div>
                <div className="border p-1" style={{height: "85vh"}}>Body</div>
                <div className="border p-1" style={{height: "9vh"}}>Footer</div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
