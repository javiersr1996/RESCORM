import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import MCQuestionChoice from './MCQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class MCQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      answered:false,


    };

  }

  componentWillUpdate(prevProps, prevState){
    if(prevProps.question !== this.props.question){
      this.setState({selected_choices_ids:[], answered:false});
    }
  }
  handleChoiceChange(choice){
    let newSelectedChoices = Object.assign([], this.state.selected_choices_ids);
    let indexOf = newSelectedChoices.indexOf(choice.id);
    if(indexOf === -1){
      newSelectedChoices.push(choice.id);
    } else {
      newSelectedChoices.splice(indexOf, 1);
    }
    this.setState({selected_choices_ids:newSelectedChoices});
  }
  onAnswerQuestion(){
    // Calculate score
    console.log("onAnswerQuestion MCQuestion")
    let nChoices = this.props.question.respuestas.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let blankAnswers = 0;
    let totalCorrectAnswers = 0;

    if (this.state.selected_choices_ids === 0){
      correctAnswers = 0;
      incorrectAnswers = 0;

    }else{
      for(let i = 0; i < nChoices; i++){
        let choice = this.props.question.respuestas[i];
        if(choice.valor == "100"){
          totalCorrectAnswers++;
        }
        if(this.state.selected_choices_ids.indexOf(choice.id) !== -1){
          // Answered choice
          if(choice.valor === "100"){
            correctAnswers += 1;
          } else if(choice.valor === "0") {
            incorrectAnswers += 1;
          }
        } else {
          blankAnswers += 1;
        }
      }
    }
    if(correctAnswers !== totalCorrectAnswers){
      correctAnswers = 0;
      incorrectAnswers = 0;
    }
    let scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / this.props.question.respuestas.filter(function(c){return c.valor === "100";}).length);
    // Send data via SCORM
    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuestion(){
    this.setState({selected_choices_ids:[], answered:false});
    this.props.numKey();
  }
  onNextQuestion(){
    this.props.onNextQuestion();

  }
  render(){
    let choices = [];
    for(let i = 0; i < this.props.question.respuestas.length; i++){
      console.log("numero respuestas pregunta "+this.props.question.respuestas.length)

      choices.push(<MCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={this.props.question.respuestas[i]} checked={this.state.selected_choices_ids.indexOf(this.props.question.respuestas[i].id) !== -1} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
    }
    return (
      <div className="question">
        <h1>{this.props.question.texto}</h1>
        {choices}
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>
      </div>
    );
  }
}
