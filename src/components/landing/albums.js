import React from "react";

import LandingAlbums from "./../../config/landing_page_albums.js";
export default class Albums extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      albums:LandingAlbums
    }

  }

  renderMusicSamples(){
      var html = [];
      for(var i = 0; i <5;i++){

        var index = i + this.props.offset;

        html.push(

          <div className="col-2 " key = {i}>
              <img alt = {i} className="w70 br10 changeSize"  src={this.state.albums[index].background}/>
              <br />
              <br />
              <p className="cw"><strong>Artist:</strong>{ " "+this.state.albums[index].name}</p>
              <p className="cw "><strong>Album:</strong>{" "+ this.state.albums[index].album}</p>
          </div>
      )
    }

    return html;

  }

  render(){
    return(
        <div className=" bbBW ">
          <br />
          <p className="catagoryName underline bold ml2_5 cw">{this.props.title}</p>
          <div className="row">
            <div className="col-1"/>
              {this.renderMusicSamples()}
            <div className="col-1"/>
          </div>
        </div>
      );
  }
}
