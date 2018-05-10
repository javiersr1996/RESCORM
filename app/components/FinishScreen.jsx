import React from 'react';
import './../assets/scss/finish_screen.scss';
import MediaFinalView from './MediaFinalView';
import SolucionesPregunta from './SolucionesPregunta';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
    let questions = this.props.questions;

    this.state = {
      questions: questions,
      array_totalpreguntas: [],
      array_textos:[],
      array_soluciones:[],
      array_tipos:[],
      array_sources: [],
    }
  }
  _getFinishScreenTitle(progress_measure, score){
    let finishTitleText;
    let hasProgressMeasure = (typeof progress_measure === "number");
    let hasScore = (typeof score === "number");
    if(hasProgressMeasure && hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_full", {progress_measure:(progress_measure * 100), score:(score * 100)});
    } else if(hasProgressMeasure){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_wpm", {progress_measure:(progress_measure * 100)});
    } else if(hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_ws", {score:(Math.floor(score * 100))});
    }
    if(typeof finishTitleText === "undefined"){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_simple");
    }
    return finishTitleText;
  }
  componentDidMount(){
    let array_totalpreguntas = [];
    let array_textos = [];
    let array_soluciones = [];
    let array_tipos = [];
    let array_sources = [];
    let index = 0;
    for(let i=0; i<this.state.questions.length; i++){
      index = i+1
      array_totalpreguntas.push("Pregunta "+index);
      array_textos.push(this.state.questions[i].texto);


      //array_soluciones.push("SOLUCION:"+" "+this.state.questions[i].solucion)
      array_tipos.push(this.state.questions[i].media.type);
      array_sources.push(this.state.questions[i].media.source);

    }
      this.setState({
        array_totalpreguntas: array_totalpreguntas,
        array_textos:array_textos,
        //array_soluciones:array_soluciones,
        array_tipos:array_tipos,
        array_sources: array_sources,
      });
  }
  render(){
    let muestras_finales = [];
    //let l = this.props.questions.length;
    for(let i = 0; i <this.state.questions.length ; i++){
      if(this.state.questions[i].media.sources !== undefined){
        muestras_finales.push(
          <div id="appPresentacion" key={i}>
             <p id="totalpreguntas">{this.state.array_totalpreguntas[i]}</p>
             <p id="respuestas">{this.state.array_textos[i]}</p>
             <SolucionesPregunta pregunta={this.state.questions[i]} key_pregunta={i}/>
             <MediaFinalView tipo={this.state.array_tipos[i]} sources={this.state.questions[i].media.sources} key_fw={i}/>
             <h3></h3>
          </div>
         );
      } else {
        muestras_finales.push(
          <div id="appPresentacion" key={i}>
             <p id="totalpreguntas">{this.state.array_totalpreguntas[i]}</p>
             <p id="respuestas">{this.state.array_textos[i]}</p>
             <SolucionesPregunta pregunta={this.state.questions[i]} key_pregunta={i}/>
             <h3></h3>
          </div>
         );

      }

    }

    let finishTitleText = this._getFinishScreenTitle(this.props.tracking.progress_measure, this.props.tracking.score);
    if(GLOBAL_CONFIG.modo === "examen"){
      return (
        <div id="AppTodo" className="finish_screen">
          <h2></h2>
          <div id="appPresentacion">
            <img align="middle" src="assets/images/quiz_logo.png" className="center" />
          </div>
          <h1 id="finish_title">{finishTitleText}</h1>
          <h1>Soluciones</h1>
          {muestras_finales}
        </div>
      );
    } else {
      return (
        <div id="AppTodo" className="finish_screen">
          <div id="appPresentacion">
            <img align="middle" src="assets/images/quiz_logo.png" className="center" />
          </div>
          <h1 id="finish_title">{finishTitleText}</h1>
        </div>
      );
    }

  }
}
