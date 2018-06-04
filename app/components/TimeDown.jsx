import React from 'react';
import {ProgressBar} from 'react-bootstrap';
import './../assets/scss/main.scss';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class TimeDown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      secondsRemaining:0,
      totalSeconds:0,
    };
    this.tick = this.tick.bind(this);
    // this.tiempoAgotado = this.tiempoAgotado.bind(this);

  }

  tick(){
    this.setState({
      secondsRemaining:this.state.secondsRemaining - 0.1,
    });
    if(this.state.secondsRemaining <= 0){
      clearInterval(this.interval);
      this.props.finishTime();

    }
  }

  componentDidMount(){
    this.setState({
      secondsRemaining:this.props.secondsRemaining,
      totalSeconds:this.props.secondsRemaining,
    });

    this.interval = setInterval(this.tick, 100);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }
  render(){
    let key = "";
    if(GLOBAL_CONFIG.modo === "examen"){
      key = "";
    } else if(GLOBAL_CONFIG.modo === "repaso"){
      key = this.props.key;
    }
   // tiempo en formato minutos:segundos
    let tiempo = Math.floor(this.state.secondsRemaining);
    if(tiempo === -1){
      tiempo = 0;
    }
    let tiempoTexto = this.props.I18n.getTrans("i.time");
    let minutos = Math.floor(tiempo / 60);
    let segundos = tiempo % 60;
    if(GLOBAL_CONFIG.modo === "examen"){
      return (
          <div>
            <div id="tiempo">
              {tiempoTexto}: {minutos} min {segundos} s
           </div>
           <div id="ProgressBar">
               <ProgressBar width="100" active striped bsStyle="warning" now={100 * this.state.secondsRemaining / this.state.totalSeconds}/>
           </div>
         </div>
      );
    }
    return;

  }
}