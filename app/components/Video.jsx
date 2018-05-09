import React from 'react';
import { Panel } from 'react-bootstrap';
import './../assets/scss/main.scss';
import './../assets/scss/video.scss';
import {GLOBAL_CONFIG} from '../config/config.js';
import $ from 'jquery';


export default class Video extends React.Component {
  constructor(props) {
    super(props);
  };
  /*
  *****************************************************
   CAMBIO DEL VOLUMEN
  *****************************************************
  */
  setVolumeExamen(){
      var vid = document.getElementById("myVideoExamen");
      vid.volume = 0.0;
  }
  setVolumeRepaso(){
      var vid = document.getElementById("myVideoRepaso");
      vid.volume = 0.0;
  }


  /*
  *****************************************************
   FULLSCREEN API STANDARD
  *****************************************************
  */
  fullScreenClickExamen(){
    var elem = document.getElementById("myVideoExamen");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();

    } else if (elem.webkitRequestFullscreen) {
      console.log("controls fullscreen CHROME")
      elem.webkitRequestFullscreen();

    }
  }
  fullScreenClickRepaso(){
    var elem = document.getElementById("myVideoRepaso");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();

    } else if (elem.webkitRequestFullscreen) {
      console.log("controls fullscreen CHROME")
      elem.webkitRequestFullscreen();

    }
  }

  render() {
    var video = "";
    let key= this.props.key_video;
    if(GLOBAL_CONFIG.modo === "examen"){
      video = (
          <div id="Panel" key={key} className="myVideoExamen">
            <video id="myVideoExamen" className="myVideoExamen" onLoadStart={this.setVolumeExamen.bind(this)} onClick={this.fullScreenClickExamen.bind(this)} key={key} width="700" height="400" autoPlay>
              <source src={this.props.video} type="video/mp4"/>
            </video>
          </div>
    );
    } else {
      video = (<video id="myVideoRepaso" onLoadStart={this.setVolumeRepaso.bind(this)} onClick={this.fullScreenClickRepaso.bind(this)} key={key} width="700" height="400" controls>
        <source src={this.props.video} type="video/mp4"/>
      </video>);
    }
    return (
      <div id="Panel" key={key}>

          {video}

      </div>
    )
  }
}
