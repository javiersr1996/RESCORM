import React from 'react';

export default class MCQuestionChoice extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log("olaaaaaaaaaaaaaaaaaaa MCQuestionChoice")
    let questionClassName = "question_choice";
    let showCorrection = (this.props.questionAnswered);
    if(showCorrection){
      if(this.props.checked){
        console.log("correccion")
        if(this.props.choice.valor === "100"){
          questionClassName += " question_choice_correct";
          console.log("corrrectooooooooooooooooooooooooooo")
        } else if (this.props.choice.valor === "0") {
          questionClassName += " question_choice_incorrect";
        }
      } else if(this.props.choice.valor === "100"){
        questionClassName += " question_choice_correct";
      }
    }
    return (
      <div className={questionClassName}>
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className="questionC2">
          <p>{this.props.choice.texto}</p>
        </div>
      </div>
    );
  }
}
