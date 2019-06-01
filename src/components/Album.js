import React, { Component } from 'react';
import albumData from './../data/albums';
//import { Link } from 'react-router-dom';

class Album extends Component {
  constructor(props) {
    super(props);
     
     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });
 
     this.state = {
       album
     };
  }

  render() {
    return (
     <section className="album">
       <section id="album-info">
         <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
           <h1 id="album-title">Album - {this.state.album.title}</h1>
             <h2 className="artist">Artist - {this.state.album.artist}</h2>
             <div id="release-info">Release Info - {this.state.album.releaseInfo}</div>
             <div id="songs">
              {
                this.state.album.songs.map((song, index, array) => {
                  return (
                  <div key = {index}>
                    {song.key} {song.title} {song.duration} 
                  </div>
                  )
                })
              }
             </div>
          </div>
        </section>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>  
            <tbody>
            </tbody>
            </table>
        </section>
    );
  }
}

export default Album;

/*
  {
    this.state.album.songs.map( (songs, index) => 
       <div>{songs}</div>
     )
  }
*/
            