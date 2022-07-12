import './App.css';
import { Component } from 'react';
import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const actions = [
  { label: "Add", value: 1 }
];

function buscaDados(){
  axios.get('http://localhost:3000/cidades')
  .then((response)=>{
    actions = response.data.map( (value) => {
      return {
        label: value

      }
    })
  }).catch((er)=>{

  })
}


class App extends Component {
  render() {
    buscaDados()
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7">Selecione seu estado:
            <Select options={actions} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="col-md-4"></div>
        </div>
      </div>
    )
  };
}


export default App;
