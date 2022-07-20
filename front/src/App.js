import './App.css';
import { Component } from 'react';
import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import video from './assets/video.mp4'

//npm start


class App extends Component {
  constructor(props) {
    super(props)



    // Aqui utilizamos o `bind` para que o `this` funcione dentro da nossa callback
    this.handleClick = this.handleClick.bind(this);


    // Set initial state 
    this.state = {
      estados: [],
      cidades: [],
      cidadeFoiSelecionada: false,
      isToggleOn: false

    }

    // Binding this keyword 
    this.estadoSelecionadoo = this.estadoSelecionadoo.bind(this)
    this.cidadeSelecionada = this.cidadeSelecionada.bind(this)



  }




  async cidadeSelecionada(event) {

    console.log(event)
  }


  async estadoSelecionadoo(event) {
    console.log(event)

    const response = await axios.get('http://localhost:3001/cidades/' + event.value);
    this.setState({
      cidades: response.data.map((obj) => {
        return {
          label: obj.cidade,
          value: obj.cidade
        }
      })
    }
    );
    this.handleClick()
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




  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="overlay"></div>
        <video src={video} autoPlay loop muted/>

        <div className="row">
          <div className="col-md-4">
            {this.state.isToggleOn === false ? <><div className='textSelecao'>         ESCOLHA O ESTADO
            </div><Select options={this.state.estados} onChange={this.estadoSelecionadoo} /></> : null}
            {this.state.isToggleOn ? <><><div className='textSelecao'>AGORA A CIDADE... </div></><Select options={this.state.cidades} onChange={this.cidadeSelecionada} /></> : null}
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
