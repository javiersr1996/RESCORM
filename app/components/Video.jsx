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
  componentDidMount(){
    //cambiar volumen de CADA VIDEO
    //probado con id="myVideo" y con id={this.props.key_video}
    this.setVolume();

  }

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
          <video id="myVideo" onClick={this.fullScreenClick.bind(this)} key={key} width="700" height="400" autoPlay>
            <source src={this.props.video} type="video/mp4"/>
          </video>
        </div>
      </div>
    )
  }
}
