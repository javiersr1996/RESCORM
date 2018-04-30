import React from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
  };
  /*
  *****************************************************
   CAMBIO DEL VOLUMEN
  *****************************************************
  */


  /*
  *****************************************************
   FULLSCREEN API STANDARD
  *****************************************************
  */
  // funciona para todos

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

  setVolume(){
    var vid = document.getElementById("myVideo");
    vid.volume = 0.0;
  }




  render() {
    //console.log("estoy en Video.jsx y la source es "+ this.props.video);
    let key= this.props.key_video;
    let myVideo = ""


    return (

      <div>
        <div>
          <video id="myVideo" onLoadStart={this.setVolume.bind(this)} onClick={this.fullScreenClick.bind(this)} key={key} width="700" height="400" autoPlay>
            <source src={this.props.video} type="video/mp4"/>
          </video>
        </div>
      </div>
    )
  }
}
