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

import {jsonSaved} from './../reducers/actions.jsx';
import {INITIAL_STATE} from './../constants/constants.jsx';
import $ from 'jquery';

import{ Panel, Carousel } from 'react-bootstrap';

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
      presentacion:0,
      jsoninterno:[],
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
        url: "http://localhost:8080/assets/files/quiz.xml",
        dataType: 'text',


        success: function(data) {
          var parseString = require('xml2js').parseString;
           parseString(data, function (err, result){

            var json = (result);
            console.log("***************result**************")
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
              if(number_question == 0){
                console.log("error")
              }
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
                console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                jsonpropio[num] = {};
                jsonpropio[num]["dificultad"] = (json.quiz.question[indice].dificultad[0]);
                jsonpropio[num]["tipo"] = (json.quiz.question[indice].tipo[0]);
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
                if(json.quiz.question[indice].dificultad[0] == 1){
                  preguntas_facil.push(num)
                } else if(json.quiz.question[indice].dificultad[0] == 2){
                  preguntas_medio.push(num)
                } else if(json.quiz.question[indice].dificultad[0] == 3){
                  preguntas_dificil.push(num)
                }
                num++;
              }
              //el tipo de pregunta es multichoice
              else if(tipo_pregunta == "multichoice"){
                jsonpropio[num] = {};
                jsonpropio[num]["tipo"] = (json.quiz.question[indice].tipo[0]);
                jsonpropio[num]["texto"] = (json.quiz.question[indice].questiontext[0].text[0]);
                jsonpropio[num]["solucion"] = (json.quiz.question[indice].solucion[0]);
                jsonpropio[num]["media"] = {};
                jsonpropio[num]["media"]["type"] = (json.quiz.question[indice].media[0].type[0]);
                jsonpropio[num]["media"]["source"] = (json.quiz.question[indice].media[0].source[0]);
                jsonpropio[num]["dificultad"] = (json.quiz.question[indice].dificultad[0]);
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
                if(json.quiz.question[indice].dificultad[0] == 1){
                  preguntas_facil.push(num)
                } else if(json.quiz.question[indice].dificultad[0] == 2){
                  preguntas_medio.push(num)
                } else if(json.quiz.question[indice].dificultad[0] == 3){
                  preguntas_dificil.push(num)
                }
                num++;
              }
            }
          });
          console.log("console log jsonpropio")
          console.log(jsonpropio)
          console.log("console log jsonredux")
           jsonredux = jsonpropio;
          console.log(jsonredux)
        }.bind(this),
        error: function(xhr, status, err) {
            console.log(status, err.toString());
        },

    });

/*
     fetch('assets/files/quiz.xml')
      .then(function(response) {
        return response.text();
      })
      .then(function(myXML) {

        console.log(myXML);
        var parseString = require('xml2js').parseString;
         parseString(myXML, function (err, result){

          var json = (result);
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
            if(number_question == 0){
              console.log("error")
            }
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


          var num = 1;
          for(let i = 1; i <= number_question; i++){
            var indice = indexQuestion(i);
            let tipo_pregunta = (json.quiz.question[indice].$.type);
            //el tipo de pregunta es truefalse
            if(tipo_pregunta == "truefalse"){
              jsonpropio[num] = {};
              jsonpropio[num]["dificultad"] = (json.quiz.question[indice].dificultad[0]);
              jsonpropio[num]["tipo"] = (json.quiz.question[indice].tipo[0]);
              jsonpropio[num]["texto"] = (json.quiz.question[indice].name[0].text[0]);
              jsonpropio[num]["media"] = {};
              jsonpropio[num]["media"]["type"] = (json.quiz.question[indice].media[0].type[0]);
              jsonpropio[num]["media"]["source"] = (json.quiz.question[indice].media[0].source[0]);
              jsonpropio[num]["respuestas"] ={};
              //jsonpropio["quiz"]["truefalse_"+numtf]["audio"] = (json.quiz.question[indice].audio[0].source);
              //aray de preguntas --> questions_size
              for(let j = 0; j < questions_size[i - 1]; j++){
                var k = 1 + j;
                var t = indice + j
                jsonpropio[num]["respuestas"][k] = {};
                jsonpropio[num]["respuestas"][k]["texto"] = (json.quiz.question[t].questiontext[0].text[0]);
                jsonpropio[num]["respuestas"][k]["valor"] = (json.quiz.question[t].answer[0].$.fraction);
                if (j == questions_size[i - 1] -1){
                    jsonpropio[num]["respuestas"]["longitud"] = k;
                }

              }

              if(json.quiz.question[indice].dificultad[0] == 1){
                preguntas_facil.push(num)
              } else if(json.quiz.question[indice].dificultad[0] == 2){
                preguntas_medio.push(num)
              } else if(json.quiz.question[indice].dificultad[0] == 3){
                preguntas_dificil.push(num)
              }

              num++;
            }
            //el tipo de pregunta es multichoice
            else if(tipo_pregunta == "multichoice"){

              jsonpropio[num] = {};
              jsonpropio[num]["tipo"] = (json.quiz.question[indice].tipo[0]);
              jsonpropio[num]["texto"] = (json.quiz.question[indice].questiontext[0].text[0]);
              jsonpropio[num]["solucion"] = (json.quiz.question[indice].solucion[0]);
              jsonpropio[num]["media"] = {};
              jsonpropio[num]["media"]["type"] = (json.quiz.question[indice].media[0].type[0]);
              jsonpropio[num]["media"]["source"] = (json.quiz.question[indice].media[0].source[0]);
              jsonpropio[num]["dificultad"] = (json.quiz.question[indice].dificultad[0]);
              jsonpropio[num]["respuestas"] ={};

              for(let j = 0; j < json.quiz.question[indice].answer.length; j++){
                var k = 1 + j;
                jsonpropio[num]["respuestas"][k] = {};
                jsonpropio[num]["respuestas"][k]["texto"] = (json.quiz.question[indice].answer[j].text[0]);
                jsonpropio[num]["respuestas"][k]["valor"] = (json.quiz.question[indice].answer[j].$.fraction);
                if (j == json.quiz.question[indice].answer.length -1){
                    jsonpropio[num]["respuestas"]["longitud"] = k;
                }
              }
              if(json.quiz.question[indice].dificultad[0] == 1){
                preguntas_facil.push(num)
              } else if(json.quiz.question[indice].dificultad[0] == 2){
                preguntas_medio.push(num)
              } else if(json.quiz.question[indice].dificultad[0] == 3){
                preguntas_dificil.push(num)
              }
              num++;
            }
          }
        });
      })
      jsonredux = jsonpropio
      console.log(jsonredux)
      this.props.dispatch(jsonSaved(jsonredux));
  */
  this.props.dispatch(jsonSaved(jsonredux));
  this.setState({
    jsoninterno:jsonredux,
  })
  }

  //-----------------FIN COMPONENTDIDMOUNT--------------------------------------------
  //---------------------------------------------------------------------------------

  //cambiar this.state.presentacion
  onPresentacion(){
    this.setState({
      presentacion:1,
    })
    return;
  }
  render(){
    console.log("reeeeeeeeendeer")
    console.log(this.props.jsoninterno);
    let appHeader = "";
    let appContent = "";



    if(this.state.presentacion === 1){
      if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
        appHeader = (
          <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
        );
        if(this.props.wait_for_user_profile !== false){
          appContent = (
            <Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.state.jsoninterno} config={GLOBAL_CONFIG} I18n={I18n}/>
          );
        }
      } else {
        appContent = (
          <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking}  config={GLOBAL_CONFIG} I18n={I18n}/>
        );
      }

      return (
        <div id="container">
          <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
          {appHeader}
          {appContent}
        </div>
      );
    //fin presentacion 1
  }

   else if(this.state.presentacion === 0){
    if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader = (
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
      if(this.props.wait_for_user_profile !== true){
        appContent = (
          <Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.props.jsoninterno} config={GLOBAL_CONFIG} I18n={I18n}/>
        );
      }
    }
    console.log(this.props.jsoninterno);
      return(
        <div>
          {appHeader}
          <Panel className="jumbotron w3-center w3-animate-left">
            <Carousel>
              <Carousel.Item>
                <img width={1500} height={1500} align="middle" src="../assets/images/quiz_logo.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={1500}  align="middle" src="  ../assets/images/amaab.jpg" />
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={1500}  align="middle" src="  ../assets/images/arbitro.jpg" />
                <Carousel.Caption>
                  <h3>No se trata de ser los más rápidos, los más fuertes, o los más grandes. Se trata de ser nosotros mismos</h3>
                  <p> Kilian Jornet</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={1500} align="middle" src="../assets/images/arbitro2.jpg" />
                <Carousel.Caption>
                  <h3>Si tú sabes lo que vales, ve y consigue lo que mereces</h3>
                  <p>Rocky Balboa</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={1500}  align="middle" src="  ../assets/images/cuerpo_arbitral.jpg" />
                <Carousel.Caption>
                  <h3>Ninguno de nosotros es tan bueno como todos nosotros juntos</h3>
                  <p> Ray Kroc</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={1500}  align="middle" src="  ../assets/images/arbitras.jpg" />
                <Carousel.Caption>
                  <h3>El arbitro considera la equidad, el juez la ley</h3>
                  <p> Aristóteles</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>;

            <p className="quiz">Selecciona el nivel de dificultad y haz click en comenzar</p>
            <p className="quiz">Selecciona las opciones que consideres correctas</p>
            <p className="quiz">Las preguntas tienen imágenes/vídeos/audios</p>
            <p className="quiz">Puedes usar comodines = tener más tiempo por pregunta</p>
          </Panel>
            <div className="quizButtonsWrapper">
              <button  onClick={this.onPresentacion.bind(this)} >COMENZAR</button>

            </div>

        </div>
      );
      //corchete presentacion 0
    }

  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);
