import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Quiz from './Quiz.jsx';

import {jsonSaved, finishApp} from './../reducers/actions.jsx';
import {INITIAL_STATE} from './../constants/constants.jsx';
import $ from 'jquery';

import{ Panel } from 'react-bootstrap';

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
      presentacion:0,
      jsoninterno:[],
      tracking_finished:false,
      finalScreen:false,
      wait_for_user_profile:true,
    }
  }
  /*
  *****************************************
  CARGAMOS EL JSON DEL XML EN APP Y SE LO PASAMOS COMO PROP A Quiz
  *****************************************
  */
  componentDidMount(){
    var jsonpropio = [];
    var preguntas_facil = [];
    var preguntas_medio = [];
    var preguntas_dificil = [];
    var jsonredux = [];
    //Load Moodle XML file
    $.ajax({
        async:false,
        method: 'GET',
        url: GLOBAL_CONFIG.xml,
        dataType: 'text',
        success: function(data) {
          var parseString = require('xml2js').parseString;
           parseString(data, function (err, result){
            var json = (result);
            console.log("***************result    1**************")
            console.log(result)
            //json obtenido del parseado
            var customjson = {}
            customjson["quiz_xml"] = {}
            customjson["quiz_xml"] = (json.quiz)
            var i = 0;
            var j = 0;
            //caso de xml con mas de una pregunta y de diferentes tipos
            //sacar el numero de preguntas que tengo y la longitud de cada una de ellas
            var questions_size = [];
            var number_question = 0;
            var question_size = 0;
            for(let i = 0; i < json.quiz.question.length; i++){
              let tipo_pregunta = (json.quiz.question[i].$.type);
              if(tipo_pregunta == "category" && number_question == 0){
                number_question++;
              } else if(tipo_pregunta != "category" && number_question != 0){
                question_size++;
              } else if(tipo_pregunta == "category" && number_question != 0){
                questions_size.push(question_size);
                question_size = 0;
                number_question++;
              }
            }
            //mete en el array el tamaño de la última pregunta recorrida
            questions_size.push(question_size);
            //se obtiene el indice de las preguntas
            function indexQuestion(number_question){
              var index = 0;
              var longitudes_anteriores_questions = 0;
              var long_cat = 0;
              ;
              if(number_question == 1){
                index = 1
              }
              if(number_question !== 1 && number_question <= questions_size.length){
                for(let i = 0; i < number_question - 1; i++){
                  longitudes_anteriores_questions += questions_size[i];
                }
                long_cat = number_question;
                index = long_cat + longitudes_anteriores_questions;
              }
              return index;
            }
            var num = 0;
            for(let i = 0; i <= number_question; i++){
              var indice = indexQuestion(i);
              let tipo_pregunta = (json.quiz.question[indice].$.type);
              //el tipo de pregunta es truefalse
              if(tipo_pregunta == "truefalse"){
                jsonpropio[num] = {};
                //jsonpropio1[num]["dificultad"] = (json.quiz.question[indice].dificultad[0]);
                jsonpropio[num]["tipo"] = (json.quiz.question[indice].$.type);
                jsonpropio[num]["texto"] = (json.quiz.question[indice].name[0].text[0]);
                jsonpropio[num]["media"] = {};
                jsonpropio[num]["media"]["type"] = (json.quiz.question[indice].media[0].type[0]);
                jsonpropio[num]["media"]["source"] = (json.quiz.question[indice].media[0].source[0]);
                jsonpropio[num]["respuestas"] = [];
                for(let j = 0; j < questions_size[i - 1]; j++){
                  var t = indice + j
                  jsonpropio[num]["respuestas"][j] ={};
                  jsonpropio[num]["respuestas"][j]["texto"] = (json.quiz.question[t].questiontext[0].text[0]);
                  jsonpropio[num]["respuestas"][j]["id"] = k;
                  jsonpropio[num]["respuestas"][j]["valor"] = (json.quiz.question[t].answer[0].$.fraction);
                  if (j == questions_size[i - 1] -1){
                      jsonpropio[num]["respuestas"]["longitud"] = j;
                  }
                }
                num++;
              }
              //el tipo de pregunta es multichoice
              else if(tipo_pregunta == "multichoice"){
                jsonpropio[num] = {};
                jsonpropio[num]["tipo"] = (json.quiz.question[indice].$.type);
                jsonpropio[num]["texto"] = (json.quiz.question[indice].questiontext[0].text[0]);
                jsonpropio[num]["solucion"] = (json.quiz.question[indice].solucion[0]);
                jsonpropio[num]["media"] = {};
                jsonpropio[num]["media"]["type"] = (json.quiz.question[indice].media[0].type[0]);
                jsonpropio[num]["media"]["source"] = (json.quiz.question[indice].media[0].source[0]);
                //jsonpropio1[num]["dificultad"] = (json.quiz.question[indice].dificultad[0]);
                jsonpropio[num]["respuestas"] =[];
                for(let j = 0; j < json.quiz.question[indice].answer.length; j++){
                  jsonpropio[num]["respuestas"][j] = {};
                  jsonpropio[num]["respuestas"][j]["id"] = j;
                  jsonpropio[num]["respuestas"][j]["texto"] = (json.quiz.question[indice].answer[j].text[0]);
                  jsonpropio[num]["respuestas"][j]["valor"] = (json.quiz.question[indice].answer[j].$.fraction);
                  if (j == json.quiz.question[indice].answer.length -1){
                      jsonpropio[num]["respuestas"]["longitud"] = j;
                  }
                }
                num++;
              }
            }
          });

        }.bind(this),
        error: function(xhr, status, err) {
            console.log(status, err.toString());
        }
    });
    jsonredux = jsonpropio;
    this.props.dispatch(jsonSaved(jsonredux));
    this.setState({
      tracking_finished:this.props.tracking.finished,
      finalScreen:GLOBAL_CONFIG.finish_screen,
    })

  }
  //-----------------FIN COMPONENTDIDMOUNT--------------------------------------------
  //---------------------------------------------------------------------------------
  /*
  ******************************************************************************
  metodo que permite la presentacion de la aplicacion
  ******************************************************************************
  */
  onPresentacion(){
    this.props.jsoninterno.sort(function() {return Math.random() - 0.5});
    for(let i =0; i<this.props.jsoninterno.length; i++){
      this.props.jsoninterno[i].respuestas.sort(function() {return Math.random() - 0.5});
    }
    this.setState({
      presentacion:1,
      jsoninterno: this.props.jsoninterno,
      wait_for_user_profile:true,
    })
    return;
  }
  /*
  *****************************************************************************
  metodo para ir a la pantalla final en caso de acabarse el tiempo del examen
  *****************************************************************************
  */
  AppfinishTime(){
    this.props.dispatch(finishApp(true));
  }
  render(){
    let texto1 = "";
    let texto2 = "";
    let texto3 = "";
    let texto4 = "";
    let imgModo = "";
    if(GLOBAL_CONFIG.modo === "examen"){
      texto1 = "MODO EXAMEN";
      texto2 = "Respuestas incorrectas no restan";
      texto3 = "Pincha en el vídeo para verlo en pantalla completa";
      texto4 = "Dispones de 3 repeticiones de vídeo/audio (sin haber contestado a la pregunta)";
      imgModo = (<img width="500" heigth="500" align="middle" src="  ../assets/images/examen.png" className="center" />);
    } else {
      texto1 = "MODO REPASO";
      texto2 = "Preguntas centradas en una temática concreta";
      texto3 = "No hay límite de tiempo por pregunta ni por el cuestionario";
      texto4 = "Puedes manejar el vídeo/audio con los controles";
      imgModo = (<img align="middle" src="  ../assets/images/repaso.png" className="center" />);
    }



    let appHeader = "";
    let appContent = "";
    if(this.state.presentacion === 1){
      if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
        appHeader = (
          <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
        );
        if(this.props.wait_for_user_profile !== false){
          appContent = (
            <Quiz finishTime={this.AppfinishTime.bind(this)} dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.state.jsoninterno} config={GLOBAL_CONFIG} I18n={I18n}/>
          );
        }
      } else {
        appContent = (
          <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} questions={this.state.jsoninterno}  config={GLOBAL_CONFIG} I18n={I18n}/>
        );
      }
      return (
        <div id="container">
          <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
          {appHeader}
          {appContent}
        </div>
      );
  }

   else if(this.state.presentacion === 0){
      return(
        <div id="AppTodo">
          {appHeader}
          <div id="appPresentacion">
            <img align="middle" src="  ../assets/images/fbm2.png" className="center" />
          </div>
              <div id="panelPresentacion">
                  <h1></h1>
                  <p className="quiz">{texto1}</p>
                  <p className="quiz">{texto2}</p>
                  <p className="quiz">{texto3}</p>
                  <p className="quiz">{texto4}</p>
              </div>
              <div id="appPresentacion">
                {imgModo}
              </div>
            <div className="quizButtonsWrapper">
              <button onClick={this.onPresentacion.bind(this)} >COMENZAR</button>
            </div>
        </div>
      );

    }
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);
