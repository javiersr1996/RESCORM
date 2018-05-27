import React from 'react';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class Audio extends React.Component {
  constructor(props){
    super(props);
  }
  /*
  *****************************************************
   CAMBIO DEL VOLUMEN
  *****************************************************
  */
  setVolume(){
    let audio = document.getElementById("myAudio");
    audio.volume = 0.5;
  }

  render(){
      let idpanel = "";
    let sources = [];

    for(let i = 0; i < 3; i++){
      if(this.props.audio[i] !== undefined){
        sources.push(<source src={this.props.audio[i].texto} type={this.props.audio[i].formato} key={i}/>);
      }
    }
    // console.log("estoy en Video.jsx y la source es "+ this.props.video);
    let key = this.props.key_audio;
    if(GLOBAL_CONFIG.modo === "repaso"){
      idpanel = "PanelRepaso";
      return (
        <div id={idpanel}>
          <div>
            <audio id="myAudio" onLoadStart={this.setVolume.bind(this)} key={key} width="700" height="500" controls>
              {sources}
            </audio>
          </div>
        </div>
      );
    } else {
        idpanel = "PanelExamenAudio";
        return (
            <div id={idpanel}>
                <div>
                    <audio id="myAudio" onLoadStart={this.setVolume.bind(this)} key={key} width="700" height="500" autoPlay>
                        {sources}
                    </audio>
                </div>
            </div>
        );
    }


  }
}