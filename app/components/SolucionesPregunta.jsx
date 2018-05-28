import React from 'react';
import {GLOBAL_CONFIG} from '../config/config.js';
import './../assets/scss/finish_screen.scss';

export default class SolucionesPregunta extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let key = this.props.key_pregunta;
    let respuestas = this.props.pregunta.respuestas;
    let solucion = [];
    let nSoluciones = 0;
    let textoInicial = "";

    for(let i = 0; i < respuestas.length; i++){
      if(respuestas[i].valor === "100" && respuestas[i].solucion !== ""){
        nSoluciones++;
        solucion.push(
          <div key={i}>
            <div><b>{respuestas[i].texto}</b></div>
            <div>{respuestas[i].solucion}</div>
          </div>);
      } else if(respuestas[i].valor === "100" && respuestas[i].solucion === ""){
        nSoluciones++;
        solucion.push(<div key={i}>{respuestas[i].texto}</div>);
      }

    }
    if(nSoluciones === 1){
      textoInicial = this.props.I18n.getTrans("i.solution");
    } else {
      textoInicial = this.props.I18n.getTrans("i.solutions");
    }
    return (
      <div key={key}>
        <div className="solucionPregunta">{textoInicial}</div>
         <div>{solucion}</div>

      </div>
    );
  }
}
