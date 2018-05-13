import React from 'react';
import {GLOBAL_CONFIG} from '../config/config.js';

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

    for(let i=0; i<respuestas.length; i++){
      if(respuestas[i].valor === "100"){
        nSoluciones++;
        solucion.push(<div key={i}>{respuestas[i].solucion}</div>);
      }

    }
    if(nSoluciones === 1){
      textoInicial = "SOLUCIÓN";
    } else {
      textoInicial = "SOLUCIONES"
    }
    return(
      <div key={key}>
        <div>{textoInicial}</div>
         <div>{solucion}</div>

      </div>
    );
  }
}