import React from "react";

import Play from "./../../images/play.png";
import Pause from "./../../images/pause.png";
import Shuffle from "./../../images/random.png";

import BarStill from "./../progress/progress_bar_still.js";
import Bar from "./../progress/progress_bar.js";
import GreyStar from "./../../images/grey_star.png";
import YellowStar from "./../../images/yellow_star.png";
import MusicNote from "./../../images/music_note.png";

class PlayBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fav:false
    }
    console.log(this.props.song);
  }

  favSong(bool){
    this.setState({fav:bool});
  }

  renderStar(){
    if(this.state.fav){
      return <img src = {YellowStar} onClick = {()=>{this.favSong(true)}} className="w50 ml25" />
    }else{
      return <img src = {GreyStar} onClick = {()=>{this.favSong(false)}} className="w50 ml25" />
    }
  }

  renderBar(){
    if(this.props.timer <= 1){
      return <BarStill />
    }else{
      return <Bar />
    }
  }

  renderShuffle(){
    return <img src = {Shuffle} onClick = {()=>{this.props.CallSongs()}}className="w50 ml25" />
  }

  renderNote(){
    return <img src = {MusicNote} onClick = {()=>{window.open(this.props.song.external)}}className="w50 ml25" />
  }

  renderButton(){
    if(this.props.song.isPlaying){
      return <img src = {Pause} className="w50 ml25"/>
    }else{
      return <img src = {Play} className="w50 ml25"/>
    }
  }

  render(){

      return(
        <div className="container-fluid positionUpward b26 ptb1">
          <div className="row">
            <div className="col-4"/>
            <div className="col-1">
              {this.renderNote()}
            </div>
            <div className="col-1">
              {this.renderButton()}
            </div>
            <div className="col-1">
              {this.renderStar()}
            </div>
            <div className="col-1">
              {this.renderShuffle()}
            </div>
            <div className="col-4"/>
          </div>
          <div className="row">
              <div className="col-2"/>
              <div className="col-8">
                {this.renderBar()}
              </div>
          </div>
        </div>
      )

  }
}






export default PlayBar;
