import React from 'react';
import './../assets/scss/finish_screen.scss';

export default class MediaFinalView extends React.Component {
  constructor(props){
    super(props);
  }
  /*
  *****************************************************
   CAMBIO DEL VOLUMEN
  *****************************************************
  */
  componentDidMount(){
    if(this.props.tipo === "video"){
      let video = document.getElementById("fsmyVideo");
      video.volume = 0.0;
    } else if(this.props.tipo === "audio"){
      let audio = document.getElementById("fsmyAudio");
      audio.volume = 0.0;
    }

  }

  /*
  *****************************************************
   FULLSCREEN API STANDARD
  *****************************************************
  */

  fullScreenClick(){
    let elem = document.getElementById("fsmyVideo");
    if(elem.requestFullscreen){
      elem.requestFullscreen();
    } else if(elem.mozRequestFullScreen){
      elem.mozRequestFullScreen();
    } else if(elem.webkitRequestFullscreen){
      elem.webkitRequestFullscreen();
    }
  }
  render(){
    let sources = [];
    if(this.props.sources === "no tiene" || this.props.sources === undefined){

    } else {
      for(let i = 0; i < 3; i++){
        if(this.props.sources[i] !== undefined){
          sources.push(<source src={this.props.sources[i].texto} type={this.props.sources[i].formato} key={i}/>);
        }
      }
    }

    let key = this.props.key_fw;
    if(this.props.tipo === "video") {
      return (
      <div className="mfv">
          <video id="fsmyVideo" onClick={this.fullScreenClick.bind(this)} /* onLoadStart={this.setVolumeVideo.bind(this)}*/ key={key} width="500" height="500" controls>
            {sources}
          </video>
      </div>
      );}
    else if(this.props.tipo === "audio"){
      return (
        <div className="mfv">
            <audio id="fsmyAudio"  /* onLoadStart={this.setVolumeAudio.bind(this)}*/ key={key} width="500" height="500" controls>
              {sources}
            </audio>
        </div>
      );
    }
    return null;

  }
}