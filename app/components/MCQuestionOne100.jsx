import React from 'react';
import './../assets/scss/main.scss';
import Video from './Video.jsx';
import Audio from './Audio.jsx';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import MCQuestionChoiceOne100 from './MCQuestionChoiceOne100.jsx';
import QuestionButtons from './QuestionButtons.jsx';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class MCQuestionOne100 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choice:"",
      answered:false,
      hiddenSolucion:true,
    };
  }

  componentWillUpdate(prevProps, prevState){
    if(prevProps.question !== this.props.question){
      this.setState({selected_choice:"", answered:false});
    }
  }
  handleChoiceChange(choice){
    let newSelectedChoice = choice;
    this.setState({selected_choice:newSelectedChoice});
  }
  onAnswerQuestion(){
    // Calculate score

    if(GLOBAL_CONFIG.modo === "repaso"){
      this.setState({
        hiddenSolucion:false,
      });
    }
    let nChoices = this.props.question.respuestas.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let blankAnswers = 0;
    let totalCorrectAnswers = 0;

    if(this.state.selected_choice === ""){
      correctAnswers = 0;
      incorrectAnswers = 0;

    } else {
      let choice = this.state.selected_choice;
      if(choice.valor === "100"){
        correctAnswers = 1;
        incorrectAnswers = 0;
      } else {
        correctAnswers = 0;
        incorrectAnswers = 0;
      }
    }

    let scorePercentage = Math.max(0, correctAnswers);
    // Send data via SCORM
    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuestion(){
    this.setState({
      selected_choice:"",
      answered:false,
    });
    this.props.onRepeticiones();
    this.props.numKey();
    // console.log("repeticiones "+this.state.repeticiones);

  }
  onNextQuestion(){
    this.props.onNextQuestion();
    if(GLOBAL_CONFIG.modo === "repaso"){
      this.setState({
        hiddenSolucion:true,
      });
    }
  }
  render(){

    let divquestion = "";
    let divmc = "";
    if(GLOBAL_CONFIG.modo === "examen" && this.props.question.media.type === "audio"){
      divquestion = "questionExamen";
      divmc = "MCQuestionChoiceExamenAudio";

    } else if(GLOBAL_CONFIG.modo === "examen" && this.props.question.media.type === "no tiene"){
      divquestion = "questionExamen";
      divmc = "MCQuestionChoiceExamenSinMedia";

    } else if(GLOBAL_CONFIG.modo === "examen"){
      divquestion = "questionExamen";
      divmc = "MCQuestionChoiceExamen";

    } else if(GLOBAL_CONFIG.modo === "repaso" && this.props.question.media.type === "no tiene"){
      divquestion = "questionRepaso";
      divmc = "MCQuestionChoiceRepasoSinMedia";

    } else {
      divquestion = "questionRepaso";
      divmc = "MCQuestionChoiceRepaso";
    }
    let media = "";

    if(this.props.question.media.type === "video"){
      media = (<Video video={this.props.question.media.sources} key_video={this.props.key_media}/>);
    } else if(this.props.question.media.type === "audio"){
      media = (<Audio audio={this.props.question.media.sources} key_audio={this.props.key_media}/>);
    } else {
      media = "";
    }

    let choices = [];
    for(let i = 0; i < this.props.question.respuestas.length; i++){
      let checked = false;
      if(this.state.selected_choice === this.props.question.respuestas[i]){
        checked = true;
      }
      choices.push(<MCQuestionChoiceOne100 key={"MyQuestion_" + "question_choice_" + i} choice={this.props.question.respuestas[i]} hiddenSolucion={this.state.hiddenSolucion} checked={checked} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
    }
    return (
       <div>
        <div className={divquestion}>
          <h1>{this.props.question.texto}</h1>
          <div className={divmc}>
            {choices}
          </div>
          {media}
        </div>
        <div className="buttons">
          <QuestionButtons question={this.props.question} repeticiones={this.props.repeticiones} I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>
        </div>
      </div>
    );
  }
}