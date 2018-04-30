import React from 'react';
import './../assets/scss/quiz.scss';

import * as Utils from '../vendors/Utils.js';
import {addObjectives, resetObjectives, finishApp} from './../reducers/actions';

import QuizHeader from './QuizHeader.jsx';
import MCQuestion from './MCQuestion.jsx';
import Video from './Video.jsx';
import Audio from './Audio.jsx';
import TimeDown from './TimeDown.jsx';

export default class Quiz extends React.Component {
  constructor(props){
    super(props);
    //se le ha pasado a quiz el json generado por el xml
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
      //questions = Utils.shuffleArray(questions);

    }
   //coje numero de preguntas determinado
    if((typeof this.props.config.n === "number") && (this.props.config.n >= 1)){
      // Limit number of questions

      questions = questions.slice(0, Math.min(this.props.config.n, questions.length));

    }



    this.state = {
      questions: questions,
      current_question_index:1,
      num_key:0
    };
  }
  componentDidMount(){

    // Create objectives (One per question included in the quiz)
    let objectives = [];
    let nQuestions = this.state.questions.length;
    console.log("numero de preguntas did mount quiz = "+this.state.questions.length)
    console.log("nQuestions = "+nQuestions)
    for(let i = 0; i < nQuestions; i++){
      objectives.push(new Utils.Objective({id:("Question" + (i + 1)), progress_measure:(1 / nQuestions), score:(1 / nQuestions)}));
    }
    this.props.dispatch(addObjectives(objectives));
  }
  onNextQuestion(){
    this.setState({num_key:this.state.num_key+1})
    let isLastQuestion = (this.state.current_question_index === this.state.questions.length);
    if(isLastQuestion === false){
      this.setState({current_question_index:(this.state.current_question_index + 1)});
    } else {
      this.props.dispatch(finishApp(true));
    }
  }
  onResetQuiz(){
    this.setState({num_key:this.state.num_key+1})
    this.setState({current_question_index:1});
    this.props.dispatch(resetObjectives());
  }
  /*
  ******************************************
   nueva key en ResetQuestion para poder volver a ver el vídeo
  ******************************************
  */
  numKey(){
    this.setState({num_key:this.state.num_key+1})
  }


  render(){
    console.log("render quiz index question = "+this.state.current_question_index)
    let currentQuestion = this.state.questions[this.state.current_question_index-1];
    let isLastQuestion = (this.state.current_question_index === this.state.questions.length);

    let objective = this.props.tracking.objectives["Question" + (this.state.current_question_index)];
    let onNextQuestion = this.onNextQuestion.bind(this);
    let onResetQuiz = this.onResetQuiz.bind(this);
    let numKey = this.numKey.bind(this);
    let currentQuestionRender = "";

    let secondsRemaining = "";

    switch (currentQuestion.tipo){
    case "multichoice":
      currentQuestionRender = (<MCQuestion question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} numKey={numKey} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished}/>);
      break;
    default:
      currentQuestionRender = "Question type not supported";
    }
    //video o audio

    let media = "";
    let timeDown = 0;

    if(currentQuestion.media.type == "video"){
      secondsRemaining = 25;
      media = (<Video video={currentQuestion.media.source} key_video={this.state.num_key}/>);
      timeDown =(<TimeDown /*onAnswerQuiz={this.onAnswerQuiz.bind(this)}*/ secondsRemaining={secondsRemaining} key={this.state.current_question_index}/>);
    } else if (currentQuestion.media.type == "audio") {
      secondsRemaining = 25;
      media = (<Audio source_audio={currentQuestion.media.source} key_audio={this.state.num_key}/>);
      timeDown =(<TimeDown /*onAnswerQuiz={this.onAnswerQuiz.bind(this)}*/ secondsRemaining={secondsRemaining} key_segundos={this.state.current_question_index}/>);
    } else {
      media = "";
      timeDown =(<TimeDown /*onAnswerQuiz={this.onAnswerQuiz.bind(this)}*/ secondsRemaining={secondsRemaining} key_segundos={this.state.current_question_index}/>);


    }
    return (
      <div className="quiz">
        <QuizHeader I18n={this.props.I18n} questions={this.state.questions} currentQuestionIndex={this.state.current_question_index}/>
        {timeDown}
        {media}
        {currentQuestionRender}


      </div>
    );
  }
}
