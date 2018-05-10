import React from 'react';


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
    if (this.props.tipo == "video"){
      var video = document.getElementById("myVideo");
      video.volume = 0.0;
    } else if(this.props.tipo == "audio")  {
      var audio = document.getElementById("myAudio");
      audio.volume = 0.0;
    } else {
      console.log("NO MEDIA")
    }





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
    let sources = [];
    if(this.props.sources === "no tiene" || this.props.sources === undefined){
      console.log("texto source indefinida")
    } else {
      for(let i=0; i<3; i++){
        if(this.props.sources[i] !== undefined){
          sources.push(<source src={this.props.sources[i].texto} type={this.props.sources[i].formato} key={i}/>)
        } else {
          console.log("no elemento source añadido")
        }
      }
    }

    let key= this.props.key_fw;
   if (this.props.tipo == "video")
    return (
      <div>
          <video id="myVideo" onClick={this.fullScreenClick.bind(this)} /*onLoadStart={this.setVolumeVideo.bind(this)}*/ key={key} width="500" height="500" controls>
            {sources}
          </video>
      </div>
    )
    else if (this.props.tipo == "audio"){
      return(
        <div>
            <audio id="myAudio"  /*onLoadStart={this.setVolumeAudio.bind(this)}*/ key={key} width="500" height="500" controls>
              {sources}
            </audio>
        </div>
      )
    } else {
      return null;
    }
  }
}
