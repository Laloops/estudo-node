import './App.css';
import { Component } from 'react';
import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {

  state = {
    cidades: [],
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:3001/cidades');

    this.setState({
      cidades: response.data.map((obj) => {
        return {
          label: obj.estado,
          value: obj.estado

        }
      })
    });
  }
  render() {
    const { cidades } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7">Selecione seu estado:
            <Select options={cidades} />
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
