import React from "react";
import axios from "axios";

import Bar from "./progress_bar";
import BarStill from "./progress_bar_still";

import BackArrow from "./../../images/backArrow.png";
import Disc from "./../../images/disc.png";
import Lock from "./../../images/lock.png";
import Pause from "./../../images/pause.png";
import Play from "./../../images/play.png";

class SongResults extends  React.Component {
  constructor(props){
    super(props);
    var songC =[];

    this.props.songs.map((song)=>{

       songC.push({
        name:song.name,
        url:song.preview_url,
        id:"l",
        playing:false
      });

    });

    this.state  = {
      album:songC
    }

  }


  makeRandomCharacters(){
    var chars = ["a","b","c","d","e","f","g","h","i","j"];

    var newChar = ""

    for(var i = 0; i < 10; i++){
        newChar += chars[Math.floor(Math.random() * chars.length)];
    }

    console.log(newChar);

    return newChar;


  }

  PlaySong (selectedSong) {

      const songs = this.state.album.slice();

      songs.forEach((song) => {
        song.playing = false;

        if (song.name === selectedSong.name) {
            song.playing = true;
          }

        });

      this.setState({ album:songs });

      console.log(this.state.album);
  }


  renderAudio(song){
      console.log(song.id);
    if(song.playing){
        return (
          <audio className="au " id = {song.id}  data = {song.id} autoPlay>
              <source src = {song.url} type="audio/mp3"/>
          </audio>
        );
      }
      else{
        return(
            <audio className="au">
              <source src = {song.url} type="audio/mp3"/>
            </audio>
          );
        }
      }


renderPlayer(song){
  if(song.url && !song.playing){
    return(
        <div className="row ">

            <div className="col-2 mt10 p0">
              <img src ={Play}  className="w100 " onClick = {()=>{
                this.PlaySong(song);
              }}/>
            </div>

            <div className="col-7 p0 mt10">
              <BarStill moving = {song.playing} />
            </div>

          </div>
        );

      }else if(song.url && song.playing){
        return(
          <div className="row ">

            <div className="col-2 p0 mt10">
              <img src ={Pause}  className="w100 " onClick = {()=>{
                this.PlaySong(song);
              }}/>
            </div>

            <div className="col-7 p0 mt10">
              <Bar moving = {true} />
            </div>

        </div>
      );
      } else{
        return (
          <div className="col-5 mt5">
            <img src ={Lock}  className="w100 mt10" />;
          </div>
        );
      }
 }


  renderSongs(){

    return this.state.album.map((song)=>{

        return(
          <div className="col-3 bb">

            {this.renderAudio(song)}

              <div className="row">
                  <div className="col-5 mt5">
                    <img className="w100" src = {this.props.albums.images[Math.floor(Math.random() * this.props.albums.images.length)].url} />
                  </div>
                  <div className="col-7 p0 mt5">
                    <p className="cw  ml15">{song.name}</p>
                  </div>
                  <div className="col-12 ">
                      {this.renderPlayer(song)}
                  </div>
                  <div className="col-12">

                    <p className="cw fl mt5 f13">{"Views: "+Math.floor(Math.random() * 9000)}</p>
                  </div>

              </div>

          </div>
        );
      });
   }

  render(){
    console.log(this.state.album[0].id);
    return(
        <div className="container-fluid">
          <div className="row">
            <div className="col-3"/>
            <div className="col-6">
              <div className="row">
                {this.renderSongs()}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default SongResults;