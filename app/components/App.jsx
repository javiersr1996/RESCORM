import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';
import {GLOBAL_CONFIG} from '../config/config.js';
import {LOCALES} from '../config/locales.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';
import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Quiz from './Quiz.jsx';
import {jsonSaved, finishApp} from './../reducers/actions.jsx';
import {INITIAL_STATE} from './../constants/constants.jsx';
import $ from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {Panel, Jumbotron} from 'react-bootstrap';

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
      presentacion:0,

    };
  }
  /*
  *****************************************
  CARGAMOS EL JSON DEL XML EN APP Y SE LO PASAMOS COMO PROP A Quiz
  *****************************************
  */
  componentDidMount(){
    let jsonpropio = [];
    let jsonredux = [];
    // Load Moodle XML file
    $.ajax({
      async:true,
      method:'GET',
      url:GLOBAL_CONFIG.xml,
      dataType:'text',
      success:function(data){
        let parseString = require('xml2js').parseString;
        parseString(data, function(err, result){
          let json = (result);
          console.log(result);
            // json obtenido del parseado
          let customjson = {};
          customjson.quiz_xml = {};
          customjson.quiz_xml = (json.quiz);

            // caso de xml con mas de una pregunta y de diferentes tipos
            // sacar el numero de preguntas que tengo y la longitud de cada una de ellas
          let question_size = [];
          let number_question = 0;
          for(let i = 0; i < json.quiz.question.length; i++){
            let tipo_pregunta = (json.quiz.question[i].$.type);
            if(tipo_pregunta !== "category"){
              number_question++;
              question_size.push(number_question);
            }
          }

            // se obtiene el indice de las preguntas
          function indexQuestion(number__question){
            let index = number__question + 1;
            return index;
          }
          let num = 0;
          for(let i = 0; i < number_question; i++){
            let indice = indexQuestion(i);
            let tipo_pregunta = (json.quiz.question[indice].$.type);
              // el tipo de pregunta es truefalse
            /*
            if(tipo_pregunta === "truefalse"){
              jsonpropio[num] = {};
              jsonpropio[num].tipo = (json.quiz.question[indice].$.type);
              jsonpropio[num].texto = (json.quiz.question[indice].name[0].text[0]);
              jsonpropio[num].media = {};
              jsonpropio[num].media.type = (json.quiz.question[indice].media[0].type[0]);
              jsonpropio[num].media.source = (json.quiz.question[indice].media[0].source[0]);
              jsonpropio[num].respuestas = [];
              for(let j = 0; j < questions_size[i - 1]; j++){
                let t = indice + j;
                jsonpropio[num].respuestas[j] = {};
                jsonpropio[num].respuestas[j].texto = (json.quiz.question[t].questiontext[0].text[0]);
                jsonpropio[num].respuestas[j].id = k;
                jsonpropio[num].respuestas[j].valor = (json.quiz.question[t].answer[0].$.fraction);
                if(j === questions_size[i - 1] - 1){
                  jsonpropio[num].respuestas.longitud = j;
                }
              }
              num++;
            }
            */
            function transform(text) {

              let arrayhtml = ReactHtmlParser(text);
              console.log(arrayhtml);
              if(arrayhtml[0].props === undefined){
                return arrayhtml[0]
              } else {
                if(arrayhtml[0].props.children[0].type === undefined){
                  return arrayhtml[0].props.children[0];
                } else {
                  return arrayhtml[0].props.children[0].props.children[0];
                }
              }
              return;
            }
              // el tipo de pregunta es multichoice
            if(tipo_pregunta === "multichoice"){
              jsonpropio[num] = {};
              jsonpropio[num].tipo = (json.quiz.question[indice].$.type);
              let texto = json.quiz.question[indice].questiontext[0].text[0];
              console.log(texto);
              // se quitan etiquetas que vienen en los textos de Moodle XML
              console.log("html enunciado")
              let palabra = transform("palabra");
              console.log(palabra);
              let parserhtml_enunciado = transform(texto);
              //let prueba = transform(parserhtml);
              console.log(parserhtml_enunciado);

            /*
              if(texto.substring(texto.indexOf('>') + 1, texto.indexOf('<')) !== ""){
                jsonpropio[num].texto = texto.substring(texto.indexOf('>') + 1, texto.lastIndexOf('<'));
              } else {
                jsonpropio[num].texto = texto;
              }
              */

              jsonpropio[num].texto = parserhtml_enunciado;
              console.log(jsonpropio[num].texto);
              if(json.quiz.question[indice].media === undefined){
                jsonpropio[num].media = {};
                jsonpropio[num].media.type = "no tiene";
                jsonpropio[num].media.sources = "no tiene";
              } else {
                jsonpropio[num].media = {};
                jsonpropio[num].media.type = (json.quiz.question[indice].media[0].type[0]);
                jsonpropio[num].media.sources = {};
                for(let j = 0; j < 3; j++){
                  if(json.quiz.question[indice].media[0].source[j] !== undefined){
                    jsonpropio[num].media.sources[j] = {};
                    jsonpropio[num].media.sources[j].texto = (json.quiz.question[indice].media[0].source[j]._);
                    jsonpropio[num].media.sources[j].formato = (json.quiz.question[indice].media[0].source[j].$.type);
                  }
                }
              }
              jsonpropio[num].respuestas = [];
              for(let j = 0; j < json.quiz.question[indice].answer.length; j++){
                jsonpropio[num].respuestas[j] = {};
                jsonpropio[num].respuestas[j].id = j;
                let respuesta = json.quiz.question[indice].answer[j].text[0];
                console.log("html respuesta")
                let parserhtml_respuesta = transform(respuesta);
                /*
                if(respuesta.substring(respuesta.indexOf('>') + 1, respuesta.lastIndexOf('<')) !== ""){
                  jsonpropio[num].respuestas[j].texto = respuesta.substring(respuesta.indexOf('>') + 1, respuesta.lastIndexOf('<'));
                } else {
                  jsonpropio[num].respuestas[j].texto = respuesta;
                }
                */
                jsonpropio[num].respuestas[j].texto = parserhtml_respuesta;
                console.log(jsonpropio[num].respuestas[j].texto);
                if(json.quiz.question[indice].answer[j].feedback !== undefined && json.quiz.question[indice].answer[j].feedback[0].text[0] !== ""){
                  let feedback = json.quiz.question[indice].answer[j].feedback[0].text[0];
                  console.log("html feedback")
                  let parserhtml_feedback = transform(feedback);
                  /*
                  if(feedback.substring(feedback.indexOf('>') + 1, feedback.lastIndexOf('<')) !== ""){
                    jsonpropio[num].respuestas[j].solucion = feedback.substring(feedback.indexOf('>') + 1, feedback.lastIndexOf('<'));
                  } else {
                    jsonpropio[num].respuestas[j].solucion = feedback;
                  }
                  */
                  jsonpropio[num].respuestas[j].solucion = parserhtml_feedback;
                  console.log(jsonpropio[num].respuestas[j].solucion)
                } else {

                  if(json.quiz.question[indice].answer[j].$.fraction === "100"){
                    jsonpropio[num].respuestas[j].solucion = I18n.getTrans("i.correct");
                    console.log(jsonpropio[num].respuestas[j].solucion);
                  } else {
                    jsonpropio[num].respuestas[j].solucion = I18n.getTrans("i.incorrect");
                    console.log(jsonpropio[num].respuestas[j].solucion);
                  }
                }

                jsonpropio[num].respuestas[j].valor = (json.quiz.question[indice].answer[j].$.fraction);
                if(j === json.quiz.question[indice].answer.length - 1){
                  jsonpropio[num].respuestas.longitud = j;
                }
              }
              num++;
            }
          }
          jsonredux = jsonpropio;

          this.props.dispatch(jsonSaved(jsonredux));
        }.bind(this));
      }.bind(this),
      error:function(xhr, status, err){
        console.log(status, err.toString());
      },
    });

  }
  // -----------------FIN COMPONENTDIDMOUNT--------------------------------------------
  // ---------------------------------------------------------------------------------
  /*
  ******************************************************************************
  metodo que permite la presentacion de la aplicacion
  ******************************************************************************
  */
  onPresentacion(){
    this.props.jsoninterno.sort(function(){return Math.random() - 0.5;});
    for(let i = 0; i < this.props.jsoninterno.length; i++){
      this.props.jsoninterno[i].respuestas.sort(function(){return Math.random() - 0.5;});
    }
    this.setState({
      presentacion:1,
    });
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

    console.log(this.props.jsoninterno);
    let TextoBienvenida = "Referee Basketball Test";

    let texto1 = "";
    let texto2 = "";
    let texto3 = "";
    let texto4 = "";
    let imgModo = "";
    let comenzar = I18n.getTrans("i.start");
    if(GLOBAL_CONFIG.modo === "examen"){
      texto1 = I18n.getTrans("i.modeExam");
      texto2 = I18n.getTrans("i.questionsExam");
      texto3 = I18n.getTrans("i.videoExam");
      texto4 = I18n.getTrans("i.repetitionsExam") + GLOBAL_CONFIG.repeticiones;
      imgModo = (<img width="200" heigth="200" align="middle" src="assets/images/examen.png" className="center" />);
    } else {
      texto1 = I18n.getTrans("i.modeStudying");
      texto2 = I18n.getTrans("i.themeStudying");
      texto3 = I18n.getTrans("i.timeStudying");
      texto4 = I18n.getTrans("i.controlsStudying");
      imgModo = (<img width="200" heigth="200" align="middle" src="assets/images/repaso.png" className="center" />);
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
            <Quiz finishTime={this.AppfinishTime.bind(this)} dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.props.jsoninterno} config={GLOBAL_CONFIG} I18n={I18n}/>
          );
        }
      } else {
        appContent = (
          <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} questions={this.props.jsoninterno} config={GLOBAL_CONFIG} I18n={I18n}/>
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
      return (
        <div>
          <div className="divJumbotron">
              <div className="appPresentacion">
                <img width="200" heigth="200" align="middle" src="
                assets/images/quiz_logo.png" className="center" />
              </div>
              <h1 id="textoBienvenida">{TextoBienvenida}</h1>
              <div className="appPresentacion">
                <img width="225" heigth="225" align="middle" src="assets/images/fbm.png" className="center" />
              </div>
          </div>
          <div className="modoJuego">
                  <p />
                  <p className="quiz">{texto1}</p>
                  <p className="quiz">{texto2}</p>
                  <p className="quiz">{texto3}</p>
                  <p className="quiz">{texto4}</p>
                  {imgModo}
              <div className="appPresentacion">
                <p />
                <button id="buttonApp" onClick={this.onPresentacion.bind(this)} >{comenzar}</button>
              </div>
          </div>
        </div>
      );

    }
    return null;
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);
