import React from 'react';
import './../assets/scss/main.scss';
import {GLOBAL_CONFIG} from '../config/config.js';
import {LOCALES} from '../config/locales.js';
import * as I18n from '../vendors/I18n.js';
export default class InitialScreen extends React.Component {
  constructor(props){
    super(props);
  }

  onPresentacion(){
    this.props.onPresentacion();
  }
  render(){

    let TextoBienvenida = "Referee Basketball Test";
    let texto1 = "";
    let texto2 = "";
    let texto3 = "";
    let texto4 = "";
    let imgModo = "";
    let comenzar = I18n.getTrans("i.start");
    if(GLOBAL_CONFIG.modo === "examen"){
      texto1 = I18n.getTrans("i.modeExam");
      texto2 = I18n.getTrans("i.questionsExam");
      texto3 = I18n.getTrans("i.videoExam");
      texto4 = I18n.getTrans("i.repetitionsExam") + GLOBAL_CONFIG.repeticiones;
      imgModo = (<img width="200" heigth="200" align="middle" src="assets/images/examen.png" className="center" />);
    } else {
      texto1 = I18n.getTrans("i.modeStudying");
      texto2 = I18n.getTrans("i.themeStudying");
      texto3 = I18n.getTrans("i.timeStudying");
      texto4 = I18n.getTrans("i.controlsStudying");
      imgModo = (<img width="200" heigth="200" align="middle" src="assets/images/repaso.png" className="center" />);
    }
    return (
      <div>
        <div className="divJumbotron">
            <div className="appPresentacion">
              <img width="200" heigth="200" align="middle" src="
              assets/images/quiz_logo.png" className="center" />
            </div>
            <h1 id="textoBienvenida">{TextoBienvenida}</h1>
            <div className="appPresentacion">
              <img width="225" heigth="225" align="middle" src="assets/images/fbm.png" className="center" />
            </div>
        </div>
        <div className="modoJuego">
                <p />
                <p className="quiz">{texto1}</p>
                <p className="quiz">{texto2}</p>
                <p className="quiz">{texto3}</p>
                <p className="quiz">{texto4}</p>
                {imgModo}
            <div className="appPresentacion">
              <p />
              <button id="buttonApp" onClick={this.onPresentacion.bind(this)} >{comenzar}</button>
            </div>
        </div>
      </div>
    );

  }
}
