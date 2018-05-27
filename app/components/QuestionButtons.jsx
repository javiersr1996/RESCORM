import React from 'react';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class QuestionButtons extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log(GLOBAL_CONFIG.repeticiones)

    let disable_answer = (this.props.answered || this.props.quizCompleted);
    let disable_resetQuestion = (this.props.answered || this.props.quizCompleted || this.props.repeticiones === GLOBAL_CONFIG.repeticiones);
    let disable_next = (!this.props.answered || this.props.quizCompleted);
    let resetQuiz = "";
    if((this.props.allow_finish) && (disable_next === false)){
      resetQuiz = (<button className="resetQuiz" onClick={this.props.onResetQuiz}>{this.props.I18n.getTrans("i.reset_quiz")}</button>);
    }
    let repeticionesTexto = this.props.I18n.getTrans("i.repetitions") + this.props.repeticiones;
    let repeticionesTextoButton = (<p>{repeticionesTexto}</p>);
    let resetQuestionButton = (<button className="resetQuestion" onClick={this.props.onResetQuestion} disabled={disable_resetQuestion}>{this.props.I18n.getTrans("i.reset_question")}</button>);
    if(this.props.repeticiones === GLOBAL_CONFIG.repeticiones){
      resetQuestionButton = "";
      repeticionesTextoButton = "";
    }
    if(GLOBAL_CONFIG.modo === "examen"){
      if(this.props.question.media.type == "audio" || this.props.question.media.type == "video"){
        return (
          <div className="questionButtonsWrapper">
            <div className="repeticiones"><b>{repeticionesTextoButton}</b></div>
            <div>
              <button className="answerQuestion" onClick={this.props.onAnswerQuestion} disabled={disable_answer}>{this.props.I18n.getTrans("i.answer")}</button>
              {resetQuestionButton}
              <button className="nextQuestion" onClick={this.props.onNextQuestion} disabled={disable_next}>{this.props.allow_finish ? this.props.I18n.getTrans("i.finish_quiz") : this.props.I18n.getTrans("i.next")}</button>
            </div>

          </div>
        );
      }
      return (
          <div className="questionButtonsWrapper">

            <div>
              <button className="answerQuestion" onClick={this.props.onAnswerQuestion} disabled={disable_answer}>{this.props.I18n.getTrans("i.answer")}</button>
              <button className="nextQuestion" onClick={this.props.onNextQuestion} disabled={disable_next}>{this.props.allow_finish ? this.props.I18n.getTrans("i.finish_quiz") : this.props.I18n.getTrans("i.next")}</button>
            </div>

          </div>
      );

    }
    return (
        <div className="questionButtonsWrapper">
          <button className="answerQuestion" onClick={this.props.onAnswerQuestion} disabled={disable_answer}>{this.props.I18n.getTrans("i.answer")}</button>
          <button className="nextQuestion" onClick={this.props.onNextQuestion} disabled={disable_next}>{this.props.allow_finish ? this.props.I18n.getTrans("i.finish_quiz") : this.props.I18n.getTrans("i.next")}</button>
        </div>
    );

  }
}
