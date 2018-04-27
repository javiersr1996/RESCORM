import React from 'react';
import './../assets/scss/finish_screen.scss';

export default class MediaFinalView extends React.Component {
  constructor(props) {
    super(props);
  };
  /*
  *****************************************************
   CAMBIO DEL VOLUMEN
  *****************************************************
  */
  componentDidMount(){
    if(this.props.tipo == "video"){
      var vid = document.getElementById("myVideo2");
      vid.volume = 0.1;
    } else if (this.props.tipo == "audio"){
      var audio = document.getElementById("myAudio2");
      audio.volume = 0.5;
    }
  }

  /*
  *****************************************************
   FULLSCREEN API STANDARD
  *****************************************************
  */

  fullScreenClick(){
    var elem = document.getElementById("myVideo2");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }




  render() {
    //console.log("estoy en Video.jsx y la source es "+ this.props.video);
    let key= this.props.key;

   if (this.props.tipo == "video")
    return (

      <div id="MediaFinalView">

          <video id="myVideo2" onClick={this.fullScreenClick.bind(this)} key={key} width="500" height="500" controls>
            <source src={this.props.source} type="video/mp4"/>
          </video>

      </div>
    )
    else if (this.props.tipo == "audio"){
      return(
        <div id="MediaFinalView">

            <audio id="myAudio2" key={key} width="500" height="500" controls>
              <source src={this.props.source} type="video/mp4"/>
            </audio>

        </div>
      )
    } else {
      return null;
    }
  }
}
