import './App.css';
import { Component } from 'react';
import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

//npm start


class App extends Component {
  constructor(props){ 
    super(props) 
       
    // Set initial state 
    this.state = {
      estados: [],
      cidades: [],
      cidadeFoiSelecionada: false
    } 
        
    // Binding this keyword 
    this.estadoSelecionadoo = this.estadoSelecionadoo.bind(this)
    this.cidadeSelecionada = this.cidadeSelecionada.bind(this)

  
  } 
  
  async cidadeSelecionada(event){
    console.log(event)
  }
 

 async estadoSelecionadoo(event){
    console.log(event)
    const response = await axios.get('http://localhost:3001/cidades/'+ event.value);    
    this.setState({
      cidades: response.data.map((obj) => {
        return {
          label: obj.cidade,
          value: obj.cidade
        }
      })
    }
    );
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:3001/estados');    

    this.setState({
      estados: response.data.map((obj) => {
        return {
          label: obj.estado,
          value: obj.estado
        }
      })
    }
    );
  }
  

  render() {
       
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7">Selecione seu estado:
            <Select options={this.state.estados} onChange={this.estadoSelecionadoo} />
            <Select options={this.state.cidades} onChange={this.cidadeSelecionada} />

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
