import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class TimeDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        secondsRemaining:0,
        totalSeconds:0,
      };
    this.tick = this.tick.bind(this);
    //this.tiempoAgotado = this.tiempoAgotado.bind(this);

  };

  tick(){
    this.setState({
      secondsRemaining:this.state.secondsRemaining -0.1
    });
    if(this.state.secondsRemaining <=0){
      clearInterval(this.interval);

    }
  };

  componentDidMount(){
    this.setState({
      secondsRemaining: this.props.secondsRemaining,
      totalSeconds: this.props.secondsRemaining,
    });

    this.interval = setInterval(this.tick,100);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  };
  /*
  tiempoAgotado(){
    this.props.onAnswerQuiz();
  }
  */



  render() {
     let key = this.props.key;
     let tiempo = Math.floor(this.state.secondsRemaining);
     if(tiempo == -1){
       tiempo = 0;
     }
    return (
        <div key={key}>
          <div>
            Tiempo: {tiempo} s
         </div>
         <div width="50">
             <ProgressBar width="100" active striped bsStyle="warning" now={100*this.state.secondsRemaining/this.state.totalSeconds}/>
         </div>
       </div>
      )
  }
}
