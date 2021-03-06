import React from "react";

import Bar from "./../../progress/progress_bar";
import BarStill from "./../../progress/progress_bar_still";

import Lock from "./../../../images/lock.png";
import Pause from "./../../../images/pause.png";
import Play from "./../../../images/play.png";
import RecordPlayer from "./../../../images/records.png";

class SongResults extends  React.Component {
  constructor(props){
    super(props);

    this.state  = {
      album:this.returnSongs(this.props.songs)
    }

  }

  returnSongs(songs){
    var songC =[];

    songs.map((song)=>{

       songC.push({
        name:song.name,
        url:song.preview_url,
        id:"l",
        playing:false
      });

    });

    return songC;

  }


  makeRandomCharacters(){

    var chars = ["a","b","c","d","e","f","g","h","i","j"];

    var newChar = ""

    for(var i = 0; i < 10; i++){
        newChar += chars[Math.floor(Math.random() * chars.length)];
    }

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

  }


  returnAudioURL(song){

    for(var i = 0; i < song.length; i++){

      if(song[i].playing){
        return song[i].url
        break
      }

    }

  }

 renderAudio(song){
    return (
      <audio className="au " autoplay  loop>
        <source src = {song} type="audio/mp3"></source>
      </audio>
    );
 }

 renderPlayer(song){
   if(song.url && !song.playing){
     return(
        <div className="row ">

            <div className="col-2  mt5 p0">
              <img alt = "song" src ={Play}  className="w100 " onClick = {()=>{
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

            <div className="col-2 p0 ">
              <img alt = "pause"  src ={Pause}  className="w100 " onClick = {()=>{
                this.PlaySong(song);
              }}/>
            </div>

            <div className="col-7 p0 mt10">
              <Bar moving = {true} />
            </div>

        </div>
      );
      }
      else{
        return (
          <div className="row">
            <div className="col-4"/>
            <div className="col-4 ">
              <img alt = "lock" src ={Lock}  className="w100 mt10" />;
            </div>
              <div className="col-4"/>
          </div>
        );
      }
 }

  renderImage(song){

    if(song.playing){
      return <img alt = "record" className="w100 rotating" src = {RecordPlayer} />
    }else{
      return <img alt = "record" className="w100" src = {RecordPlayer} />
    }

  }

  renderSongs(){

    return this.state.album.map((song)=>{

        var border = "";

        if(song.playing){
          border = "bordRR"
        }

        return(

          <div className="col-4">
              <br />
              <div className={"row " +border}>
                  <div className="col-2"/>
                  <div className="col-8">
                    {this.renderImage(song)}
                  </div>
                  <div className="col-12 ">
                    <p className="cw  text-center ml15">{song.name}</p>
                  </div>
                  <div className="col-12 ">
                      {this.renderPlayer(song)}
                  </div>
                  <div className="col-12">
                    <p className="cw text-center mt5 f13">{"Views: "+Math.floor(Math.random() * 9000)}</p>
                  </div>

              </div>

          </div>
        );
      });
   }

  render(){



    return(
        <div className="container-fluid">

          <div className="row">

            <div className="col-2"/>

            <div className="col-8">

              <div className="row">
                  <br />
                  {this.renderSongs()}
              </div>

            </div>

          </div>

        </div>
    )
  }
}

export default SongResults;
