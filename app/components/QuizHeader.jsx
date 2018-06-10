import React from 'react';
import {GLOBAL_CONFIG} from '../config/config.js';
import './../assets/scss/main.scss';

export default class QuizHeader extends React.Component {
  constructor(props){
    super(props);
  }
  render(){

    return (
      <div className="quizHeader">
        <p>{this.props.I18n.getTrans("i.quiz_header_title", {current:this.props.currentQuestionIndex, total:this.props.questions.length})}</p>
      </div>
    );
  }
}