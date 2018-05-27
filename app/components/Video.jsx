import React from 'react';
import {Panel} from 'react-bootstrap';
import './../assets/scss/main.scss';
import './../assets/scss/video.scss';
import {GLOBAL_CONFIG} from '../config/config.js';
import $ from 'jquery';

export default class Video extends React.Component {
  constructor(props){
    super(props);
  }
  /*
  *****************************************************
   CAMBIO DEL VOLUMEN
  *****************************************************
  */
  setVolumeExamen(){
    let vid = document.getElementById("myVideoExamen");
    vid.volume = 0.2;
  }
  setVolumeRepaso(){
    let vid = document.getElementById("myVideoRepaso");
    vid.volume = 0.2;
  }

  /*
  *****************************************************
   FULLSCREEN API STANDARD
  *****************************************************
  */
  fullScreenClickExamen(){
    let elem = document.getElementById("myVideoExamen");
    if(elem.requestFullscreen){
      elem.requestFullscreen();
    } else if(elem.mozRequestFullScreen){
      elem.mozRequestFullScreen();

    } else if(elem.webkitRequestFullscreen){

      elem.webkitRequestFullscreen();

    }
  }
  fullScreenClickRepaso(){
    let elem = document.getElementById("myVideoRepaso");
    if(elem.requestFullscreen){
      elem.requestFullscreen();
    } else if(elem.mozRequestFullScreen){
      elem.mozRequestFullScreen();

    } else if(elem.webkitRequestFullscreen){

      elem.webkitRequestFullscreen();

    }
  }

  render(){

    // cuantas sources tengo
    let sources = [];

    for(let i = 0; i < 3; i++){
      if(this.props.video[i] !== undefined){
        sources.push(<source src={this.props.video[i].texto} type={this.props.video[i].formato} key={i}/>);
      }
    }

    let video = "";
    let idpanel = "";
    let key = this.props.key_video;
    if(GLOBAL_CONFIG.modo === "examen"){
      idpanel = "PanelExamen";
      video = (
          <div key={key} className="divmyVideoExamen">
            <video id="myVideoExamen" className="myVideoExamen" onLoadStart={this.setVolumeExamen.bind(this)} onClick={this.fullScreenClickExamen.bind(this)} key={key} autoPlay>
              {sources}
            </video>
          </div>
    );
    } else {
      idpanel = "PanelRepaso";
      video = (
          <video id="myVideoRepaso" className="myVideoRepaso" onLoadStart={this.setVolumeRepaso.bind(this)} onClick={this.fullScreenClickRepaso.bind(this)} key={key} controls>
            {sources}
          </video>);
    }
    return (
      <div id={idpanel} key={key}>

          {video}

      </div>
    );
  }
}