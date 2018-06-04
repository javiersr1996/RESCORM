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
      questions:questions,
      array_totalpreguntas:[],
      array_textos:[],
    };
  }
  _getFinishScreenTitle(progress_measure, score){
    let finishTitleText;
    let hasProgressMeasure = (typeof progress_measure === "number");
    let hasScore = (typeof score === "number");
    if(hasProgressMeasure && hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_full", {progress_measure:(progress_measure * 100), score:(score.toFixed(3) * 10)});
    } else if(hasProgressMeasure){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_wpm", {progress_measure:(progress_measure * 100)});
    } else if(hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_ws", {score:(Math.floor(score.toFixed(3) * 10))});
    }
    if(typeof finishTitleText === "undefined"){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_simple");
    }

    return finishTitleText;
  }

  componentDidMount(){
    let array_totalpreguntas = [];
    let array_textos = [];
    let index = 0;
    let long_cuestionario = Math.min(GLOBAL_CONFIG.n, this.state.questions.length);
    for(let i = 0; i < long_cuestionario; i++){
      index = i + 1;
      array_totalpreguntas.push(this.props.I18n.getTrans("i.questionText") + index);
      array_textos.push(this.state.questions[i].texto);

    }
    this.setState({
      array_totalpreguntas:array_totalpreguntas,
      array_textos:array_textos,

    });
  }

  render(){
    let suspenso = this.props.I18n.getTrans("i.failed");
    let aprobado = this.props.I18n.getTrans("i.approved");
    let bien = this.props.I18n.getTrans("i.good");
    let notable = this.props.I18n.getTrans("i.greatjob");
    let sobresaliente = this.props.I18n.getTrans("i.merit");

    let examenSolucion = this.props.I18n.getTrans("i.examSolution");

    let divNota = "";
    let nota = this.props.tracking.score * 10;
    if(nota < 5){
      divNota = (
        <div>
          <h1>{suspenso}</h1>
          <img width="400" heigth="400" align="middle" src="assets/images/suspenso.png" className="center" />
        </div>
      );
    } else if(nota >= 5 && nota < 7){
      divNota = (
        <div>
          <h1>{aprobado}</h1>
          <img width="400" heigth="400" align="middle" src="assets/images/aprobado.png" className="center" />
        </div>
      );
    } else if(nota >= 7 && nota < 9){
      divNota = (
        <div>
          <h1>{notable}</h1>
          <img width="400" heigth="400" align="middle" src="assets/images/notable.png" className="center" />
        </div>
      );
    } else if(nota >= 9){
      divNota = (
        <div>
          <h1>{sobresaliente}</h1>
          <img width="400" heigth="400" align="middle" src="assets/images/sobresaliente.png" className="center" />
        </div>
      );
    }
    let longitud_cuestionario = Math.min(GLOBAL_CONFIG.n, this.state.questions.length);
    console.log(longitud_cuestionario);
    let muestras_finales = [];
    for(let i = 0; i < longitud_cuestionario; i++){
      console.log(this.state.questions[i].media.type);
      console.log(this.state.questions[i].media.sources);
      if(this.state.questions[i].media.sources !== undefined && this.state.questions[i].media.type === "video"){
        muestras_finales.push(
          <div className="fsPresentacionVideo" key={i}>
             <p className="totalpreguntas"><b>{this.state.array_totalpreguntas[i]}</b></p>
             <p className="respuestas">{this.state.array_textos[i]}</p>
             <SolucionesPregunta I18n={this.props.I18n} pregunta={this.state.questions[i]} key_pregunta={i}/>
             <div className="mfv">
               <MediaFinalView tipo={this.state.questions[i].media.type} sources={this.state.questions[i].media.sources} key_fw={i}/>
             </div>
             <h3 />
          </div>
         );

      } else if(this.state.questions[i].media.sources !== undefined && this.state.questions[i].media.type === "audio"){
        muestras_finales.push(
          <div className="fsPresentacionAudio" key={i}>
             <p className="totalpreguntas"><b>{this.state.array_totalpreguntas[i]}</b></p>
             <p className="respuestas">{this.state.array_textos[i]}</p>
             <SolucionesPregunta I18n={this.props.I18n} pregunta={this.state.questions[i]} key_pregunta={i}/>
             <div className="mfv">
               <MediaFinalView tipo={this.state.questions[i].media.type} sources={this.state.questions[i].media.sources} key_fw={i}/>
             </div>
             <h3 />
          </div>
         );

      } else {
        muestras_finales.push(
          <div className="fsPresentacion" key={i}>
             <p className="totalpreguntas"><b>{this.state.array_totalpreguntas[i]}</b></p>
             <p className="respuestas">{this.state.array_textos[i]}</p>
             <SolucionesPregunta I18n={this.props.I18n} pregunta={this.state.questions[i]} key_pregunta={i}/>
             <h3 />
          </div>
         );
      }
    }

    let finishTitleText = this._getFinishScreenTitle(this.props.tracking.progress_measure, this.props.tracking.score);
    if(GLOBAL_CONFIG.modo === "examen"){
      return (
        <div id="AppTodo" className="finish_screen">
          <h2 />
          <div id="appPresentacionFinal">
            <img align="middle" src="assets/images/quiz_logo.png" className="center" />
          </div>
          <h1 id="finish_title">{finishTitleText}</h1>
          {divNota}
          <h1 id="solucionTexto">{examenSolucion}</h1>
          <p />
          {muestras_finales}
        </div>
      );
    }
    return (
          <div id="AppTodo" className="finish_screen">
            <h2 />
            <div id="appPresentacionFinal">
              <img align="middle" src="assets/images/quiz_logo.png" className="center" />
            </div>
            <h1 id="finish_title">{finishTitleText}</h1>
            {divNota}
          </div>
    );

  }
}