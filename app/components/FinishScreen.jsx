import React from 'react';
import './../assets/scss/finish_screen.scss';
import MediaFinalView from './MediaFinalView';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
    let questions = this.props.questions;

    this.state = {
      questions: questions,
      array_totalpreguntas: [],
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
    let array_soluciones = [];
    let array_tipos = [];
    let array_sources = [];
    let index = 0;
    for(let i=0; i<this.state.questions.length; i++){
      index = i+1
      array_totalpreguntas.push("Pregunta "+index);
      array_soluciones.push(this.state.questions[i].texto+" "+" -->"+" "+this.state.questions[i].solucion);
      console.log(this.state.questions[i].texto);
      array_tipos.push(this.state.questions[i].media.type);
      array_sources.push(this.state.questions[i].media.source);
      this.setState({
        array_totalpreguntas: array_totalpreguntas,
        array_soluciones:array_soluciones,
        array_tipos:array_tipos,
        array_sources: array_sources,
      })
    }
  }
  render(){
    let muestras_finales = [];
    //let l = this.props.questions.length;
    for(let i = 0; i <this.state.questions.length ; i++){
    muestras_finales.push(
      <div id="MediaFinalView">
         <p id="totalpreguntas">{this.state.array_totalpreguntas[i]}</p>
         <p id="respuestas">{this.state.array_soluciones[i]}</p>
         <MediaFinalView tipo={this.state.array_tipos[i]} source={this.state.array_sources[i]} key={i}/>
         <h3></h3>

      </div>
     );
    }

    let finishTitleText = this._getFinishScreenTitle(this.props.tracking.progress_measure, this.props.tracking.score);
    if(GLOBAL_CONFIG === "examen"){
      return (
        <div className="finish_screen">
          <h1 id="finish_title">{finishTitleText}</h1>
          {muestras_finales}
        </div>
      );
    } else {
      return (
        <div className="finish_screen">
          <h1 id="finish_title">{finishTitleText}</h1>
        </div>
      );
    }

  }
}
