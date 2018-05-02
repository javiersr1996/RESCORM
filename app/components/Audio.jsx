import React from 'react';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class Audio extends React.Component {
  constructor(props) {
    super(props);
  };
  /*
  *****************************************************
   CAMBIO DEL VOLUMEN
  *****************************************************
  */
  setVolume(){
      var audio = document.getElementById("myAudio");
      audio.volume = 0.5;
  }

  render() {
    //console.log("estoy en Video.jsx y la source es "+ this.props.video);
    let key= this.props.key_audio;
    if(GLOBAL_CONFIG.modo === "repaso"){
      return (
        <div>
          <div>
            <audio id="myAudio" onLoadStart={this.setVolume.bind(this)} key={key} width="700" height="500" controls>
              <source src={this.props.source_audio} type="video/mp4"/>
            </audio>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <audio id="myAudio" onLoadStart={this.setVolume.bind(this)} key={key} width="700" height="500" autoPlay>
              <source src={this.props.source_audio} type="video/mp4"/>
            </audio>
          </div>
        </div>
      )
    }

  }
}
