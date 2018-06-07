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
    let textoInicial = "";
    let textorespuesta = this.props.I18n.getTrans("i.answerText");
    let correcta = this.props.I18n.getTrans("i.correct");
    let incorrecta = this.props.I18n.getTrans("i.incorrect");

    for(let i = 0; i < respuestas.length; i++){
      if(respuestas[i].solucion !== "" && respuestas[i].valor === "100"){
        solucion.push(
          <div key={i}>
            <div className="divRespuestaCorrecta"><b>{textorespuesta} {respuestas[i].texto}</b></div>
            <div className="divRespuestaCorrecta"><b>{respuestas[i].solucion}</b></div>
            <p>&nbsp;</p>
          </div>);
      } else if(respuestas[i].solucion !== "" && respuestas[i].valor === "0"){
        solucion.push(
          <div key={i}>
            <div className="divRespuestaIncorrecta">{textorespuesta} {respuestas[i].texto}</div>
            <div className="divRespuestaIncorrecta">{respuestas[i].solucion}</div>
            <p>&nbsp;</p>
          </div>);
      } else if(respuestas[i].solucion === "" && respuestas[i].valor === "100"){
        solucion.push(
          <div key={i}>
            <div className="divRespuestaCorrecta"><b>{textorespuesta} {respuestas[i].texto}</b></div>
            <div className="divRespuestaCorrecta"><b>{correcta}</b></div>
            <p>&nbsp;</p>
          </div>);
      } else if(respuestas[i].solucion === "" && respuestas[i].valor === "0"){
        solucion.push(
          <div key={i}>
            <div className="divRespuestaIncorrecta"> {textorespuesta} {respuestas[i].texto}</div>
            <div className="divRespuestaIncorrecta">{incorrecta}</div>
            <p>&nbsp;</p>
          </div>);
      }

    }

    return (
      <div key={key}>
         <div>{solucion}</div>
      </div>
    );
  }
}