import React from 'react';
import {GLOBAL_CONFIG} from '../config/config.js';
import './../assets/scss/quiz.scss';

export default class MCQuestionChoice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      solucion:"",
      classNameDivSolucion:"hiddenDiv",
    };
  }
  render(){
    let questionClassName = "question_choice";
    let showCorrection = (this.props.questionAnswered);
    if(showCorrection){
      if(this.props.checked){

        if(this.props.choice.valor === "100"){
          if(GLOBAL_CONFIG.modo === "examen"){

            questionClassName += " question_choice_correct_examen";
          } else {
            questionClassName += " question_choice_correct";
          }

        } else if(this.props.choice.valor === "0"){
          if(GLOBAL_CONFIG.modo === "examen"){
            questionClassName += " question_choice_incorrect_examen";
          } else {
            questionClassName += " question_choice_incorrect";
          }

        }
      } else if(this.props.choice.valor === "100"){
        if(GLOBAL_CONFIG.modo === "examen"){
          questionClassName += " question_choice_correct_examen";
        } else {
          questionClassName += " question_choice_correct";
        }

      }
    }
    if(this.props.hiddenSolucion === true){
      return (

            <div className={questionClassName}>
              <div className="questionC1">
                <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
              </div>
              <div className="questionC2">
                <p>{this.props.choice.texto}</p>
              </div>
              <div className="hiddenDiv">
                <p id="textoSolucion">{this.props.choice.solucion}</p>
              </div>
            </div>

      );
    }
    return (

            <div className={questionClassName}>
              <div className="questionC1">
                <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
              </div>
              <div className="questionC2">
                <p>{this.props.choice.texto}</p>
              </div>
              <div className="questionC3">
                <p id="textoSolucion">{this.props.choice.solucion}</p>
              </div>
            </div>

    );

  }
}