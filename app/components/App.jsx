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
import {INITIAL_STATE, JSON_INTERNO} from './../constants/constants.jsx';

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();

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
    //Load Moodle XML file
    const request = async () => {
      const respuesta = await fetch('assets/files/quiz.xml')
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

          jsonpropio["questions"] = {};
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
              jsonpropio["questions"][num] = {};
              jsonpropio["questions"][num]["dificultad"] = (json.quiz.question[indice].dificultad[0]);
              jsonpropio["questions"][num]["tipo"] = (json.quiz.question[indice].tipo[0]);
              jsonpropio["questions"][num]["texto"] = (json.quiz.question[indice].name[0].text[0]);
              jsonpropio["questions"][num]["media"] = {};
              jsonpropio["questions"][num]["media"]["type"] = (json.quiz.question[indice].media[0].type[0]);
              jsonpropio["questions"][num]["media"]["source"] = (json.quiz.question[indice].media[0].source[0]);
              jsonpropio["questions"][num]["respuestas"] ={};
              //jsonpropio["quiz"]["truefalse_"+numtf]["audio"] = (json.quiz.question[indice].audio[0].source);
              //aray de preguntas --> questions_size
              for(let j = 0; j < questions_size[i - 1]; j++){
                var k = 1 + j;
                var t = indice + j
                jsonpropio["questions"][num]["respuestas"][k] = {};
                jsonpropio["questions"][num]["respuestas"][k]["texto"] = (json.quiz.question[t].questiontext[0].text[0]);
                jsonpropio["questions"][num]["respuestas"][k]["valor"] = (json.quiz.question[t].answer[0].$.fraction);
                if (j == questions_size[i - 1] -1){
                    jsonpropio["questions"][num]["respuestas"]["longitud"] = k;
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

              jsonpropio["questions"][num] = {};
              jsonpropio["questions"][num]["tipo"] = (json.quiz.question[indice].tipo[0]);
              jsonpropio["questions"][num]["texto"] = (json.quiz.question[indice].questiontext[0].text[0]);
              jsonpropio["questions"][num]["solucion"] = (json.quiz.question[indice].solucion[0]);
              jsonpropio["questions"][num]["media"] = {};
              jsonpropio["questions"][num]["media"]["type"] = (json.quiz.question[indice].media[0].type[0]);
              jsonpropio["questions"][num]["media"]["source"] = (json.quiz.question[indice].media[0].source[0]);
              jsonpropio["questions"][num]["dificultad"] = (json.quiz.question[indice].dificultad[0]);
              jsonpropio["questions"][num]["respuestas"] ={};

              for(let j = 0; j < json.quiz.question[indice].answer.length; j++){
                var k = 1 + j;
                jsonpropio["questions"][num]["respuestas"][k] = {};
                jsonpropio["questions"][num]["respuestas"][k]["texto"] = (json.quiz.question[indice].answer[j].text[0]);
                jsonpropio["questions"][num]["respuestas"][k]["valor"] = (json.quiz.question[indice].answer[j].$.fraction);
                if (j == json.quiz.question[indice].answer.length -1){
                    jsonpropio["questions"][num]["respuestas"]["longitud"] = k;
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
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      const jsonredux = await respuesta.jsonpropio
      console.log(jsonredux)
      this.props.dispatch(jsonSaved(jsonredux));
    }
    console.log("requesttttttttttttt")
    request();
  }

  //-----------------FIN COMPONENTDIDMOUNT--------------------------------------------
  //---------------------------------------------------------------------------------
  render(){
    console.log("****************render app***********************************")
    console.log(this.props.jsoninterno);
    let appHeader = "";
    let appContent = "";
    //jsoninterno ok
    let mierda = "mierda";


    //console.log(this.state.jsoninterno.quiz.questions);

    if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader = (
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
      if(this.props.wait_for_user_profile !== true){
        appContent = (
          <Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.props.jsoninterno} config={GLOBAL_CONFIG} I18n={I18n}/>
        );
      }
    } else {
      appContent = (
        <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={quiz} config={GLOBAL_CONFIG} I18n={I18n}/>
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
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);
