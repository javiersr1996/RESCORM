import React from 'react';
import { Panel } from 'react-bootstrap';
import './../assets/scss/main.scss';


export default class Video extends React.Component {
  constructor(props) {
    super(props);

  };
  /*
  *****************************************************
   CAMBIO DEL VOLUMEN
  *****************************************************
  */
  setVolume(){
      var vid = document.getElementById("myVideo");
      vid.volume = 0.0;
  }


  /*
  *****************************************************
   FULLSCREEN API STANDARD
  *****************************************************
  */
  fullScreenClick(){
    var elem = document.getElementById("myVideo");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  render() {
    var video = (<video id="myVideo" onLoadStart={this.setVolume.bind(this)} onClick={this.fullScreenClick.bind(this)} key={key} width="700" height="400" autoPlay>
      <source src={this.props.video} type="video/mp4"/>
    </video>);
    let key= this.props.key_video;
    return (
      <div id="Panel" key={key}>

          {video}

      </div>
    )
  }
}
