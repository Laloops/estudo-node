import './App.css';
import { Component } from 'react';
import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const actions = [
  { label: "Add", value: 1 },
  { label: "Edit", value: 2 },
  { label: "Delete", value: 3 }
];

class App extends Component {
  render() {
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
