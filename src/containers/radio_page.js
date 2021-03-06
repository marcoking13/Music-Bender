import React from "react";

import Navbar from "./../components/navbar/navbar.js";
import Footnote from "./../components/footer/footnote.js";

import SongBox from "./../components/radio/song_box.js";
import PlayBar from "./../components/radio/play_bar.js";
import Loader from "./../components/radio/loading_page.js";

import Colors from "./../config/colors.js";

import "./../css/radio.css";

import Songs from "./../config/randomSongs";

var background = `url("./assets/images/b1.jpg")`


class RadioPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      songs:Songs,
      current:null,
      reset:false,
      isPlaying:true,
      options:{
        method:"GET",
        headers:{
          "Authorization": "Bearer "+ this.props.token
        },
        mode:"cors",
        cache:"default"
      },
      timer:0
    }

    this.CallSongs(this.state.songs);
    this.togglePause = this.togglePause.bind(this);

    this.CallSongs = this.CallSongs.bind(this);
  }

  togglePause(toggle){

      this.setState({isPlaying:toggle,timer:.005})

  }

  componentDidMount(){

    this.props.UpdateToken(window.location.href.slice(58,224));

    this.timerCount = setInterval(()=>{

      if(this.state.timer === 30 ){
        this.CallSongs(this.state.songs);
      }else{
        this.setState({timer:this.state.timer + 1})
      }
    },1000);
  }



  CallSongs(){

    var songID = this.state.songs[Math.floor(Math.random() * this.state.songs.length)];
    const BASE_URL = "https://api.spotify.com/v1/tracks/"
    const FETCH_URL = BASE_URL + songID;

    fetch(FETCH_URL,this.state.options)
      .then(response =>response.json())

        .then(json => {

            var current = {
              artist: json.artists[0].name,
              songName:json.name,
              finish:false,
              url:json.preview_url,
              external:json.external_urls.spotify,
              image:json.album.images[0].url,
              isPlaying:true
            }

            this.setState({reset:true,current:current,timer:0});

        })

  }

  renderSong(){

    return(

      <div>
        <div className="row">
          <div className="col-2"/>
          <div className="col-10">

                <SongBox  isPlaying = {this.state.isPlaying} togglePause = {this.togglePause} song = {this.state.current} songs = {this.state.songs} CallSongs = {this.CallSongs} />

          </div>
          <div className="col-2"/>
        </div>
        <br />
        <PlayBar  isPlaying = {this.state.isPlaying} timer = {this.state.timer}  togglePause = {this.togglePause} song = {this.state.current} CallSongs = {this.CallSongs} />
      </div>
    )
  }

  renderAudio(){
    if(this.state.timer == 0  && !this.state.isPlaying){
      return null
    } else if(this.state.isPlaying){
      return (
        <audio autoPlay loop>
          <source type="audio/mp3" src = {this.state.current.url}></source>
        </audio>
      )
    }
  }

  render(){

    if(this.state.timer > 0){
      return(
        <div className="container-fluid ">
          {this.renderAudio()}
          <div>
            <Navbar token = {this.props.token}/>
          </div>
          <br />
          {this.renderSong()}

          <Footnote />
        </div>
      );
    }else{
      return (<Loader />)
    }
  }
}


export default RadioPage;
