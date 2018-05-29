import React from 'react';
import './../assets/scss/quiz.scss';

import * as Utils from '../vendors/Utils.js';
import {addObjectives, resetObjectives, finishApp} from './../reducers/actions';
import {GLOBAL_CONFIG} from '../config/config.js';
import QuizHeader from './QuizHeader.jsx';
import MCQuestion from './MCQuestion.jsx';
import TimeDown from './TimeDown.jsx';

export default class Quiz extends React.Component {
  constructor(props){
    super(props);
    // se le ha pasado a quiz el json generado por el xml
    let questions = this.props.quiz;

    // Adaptive behaviour
    // Sort questions based on difficulty
    let adaptive_sorted = false;
    if((this.props.config.adaptive === true) && (typeof props.user_profile === "object") && (typeof props.user_profile.learner_preference === "object") && (typeof props.user_profile.learner_preference.difficulty === "number")){
      let difficulty = props.user_profile.learner_preference.difficulty;
      /*
      if((difficulty >= 0) && (difficulty <= 10)){
        for(let i = 0; i <= questions.length; i++){
          if((typeof questions[i].dificultad !== "number") || (questions[i].dificultad < 0) || (questions[i].dificultad > 10)){
            questions[i].dificultad = 5;
          }
          //questions[i].suitability = (10 - Math.abs((questions[i].dificultad - difficulty))) / 10;
        }
        //questions.sort(function(a, b){ return b.suitability - a.suitability; });
        adaptive_sorted = true;
      }
      */
    }

    if(adaptive_sorted === false){
      // questions = Utils.shuffleArray(questions);

    }
   // coje numero de preguntas determinado
    if((typeof this.props.config.n === "number") && (this.props.config.n >= 1)){
      // Limit number of questions

      questions = questions.slice(0, Math.min(this.props.config.n, questions.length));

    }
    this.state = {
      questions:questions,
      current_question_index:1,
      num_key:1,
      hiddenSolucion:false,
    };
    // this.tiempoAgotado = this.tiempoAgotado.bind(this);
  }
  componentDidMount(){
    // Create objectives (One per question included in the quiz)
    let objectives = [];
    let nQuestions = this.state.questions.length;
    // console.log("numero de preguntas did mount quiz = "+this.state.questions.length)
    // console.log("nQuestions = "+nQuestions)
    for(let i = 0; i < nQuestions; i++){
      objectives.push(new Utils.Objective({id:("Question" + (i + 1)), progress_measure:(1 / nQuestions), score:(1 / nQuestions)}));
    }
    this.props.dispatch(addObjectives(objectives));
  }
  onNextQuestion(){
    this.setState({num_key:this.state.num_key + 1});
    let isLastQuestion = (this.state.current_question_index === this.state.questions.length);
    if(isLastQuestion === false){
      this.setState({current_question_index:(this.state.current_question_index + 1)});
    } else {
      this.props.dispatch(finishApp(true));
    }
  }
  onResetQuiz(){
    this.setState({
      num_key:this.state.num_key + 1,
      current_question_index:1,
      hiddenSolucion:true,
    });

    this.props.dispatch(resetObjectives());
  }
  /*
  ******************************************
   nueva key en ResetQuestion para poder volver a ver el vídeo
  ******************************************
  */
  numKey(){
    this.setState({num_key:this.state.num_key + 1});
  }
  finishTime(){
    if(GLOBAL_CONFIG.modo === "examen"){
      this.props.finishTime();
    } else {
      this.onNextQuestion();
    }

  }
  render(){

    let currentQuestion = this.state.questions[this.state.current_question_index - 1];
    let isLastQuestion = (this.state.current_question_index === this.state.questions.length);

    let objective = this.props.tracking.objectives["Question" + (this.state.current_question_index)];
    let onNextQuestion = this.onNextQuestion.bind(this);
    let onResetQuiz = this.onResetQuiz.bind(this);
    let numKey = this.numKey.bind(this);
    let currentQuestionRender = "";

    switch (currentQuestion.tipo){
    case "multichoice":
      currentQuestionRender = (<MCQuestion question={currentQuestion} key_media={this.state.num_key} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} numKey={numKey} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} hiddenSolucion={this.state.hiddenSolucion}/>);
      break;
    default:
      currentQuestionRender = "Question type not supported";
    }
    // en modo examen es el mismo tiempo para todo el quiz --> único key para llamar a TimeDown
    // en modo repaso se resetea el tiempo para cada pregunta --> distinto key en cada llamada a TimeDown
    let secondsRemaining = 0;
    let timeDown = "";
    if(GLOBAL_CONFIG.modo === "examen"){
      secondsRemaining = GLOBAL_CONFIG.secondsRemaining;
      timeDown = (<TimeDown I18n={this.props.I18n} finishTime={this.finishTime.bind(this)} secondsRemaining={secondsRemaining}/>);
    } else if(GLOBAL_CONFIG.modo === "repaso"){
      secondsRemaining = 0;
      // timeDown =(<TimeDown finishTime={this.finishTime.bind(this)} secondsRemaining={secondsRemaining} key={this.state.num_key}/>);
    }
    // video o audio

    return (
      <div className="quiz">
        <QuizHeader I18n={this.props.I18n} questions={this.state.questions} currentQuestionIndex={this.state.current_question_index}/>
        {timeDown}
        {currentQuestionRender}
      </div>
    );
  }
}