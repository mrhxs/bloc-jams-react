import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component { 
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
      }
    
    render() {
     return ( 
       <section className='library'>
        {
          this.state.albums.map( (album, index) => 
          <Link  className="mdl-grid" to={`/album/${album.slug}`} key={index}>
               <img className="mdl-cell mdl-cell--3-col" src={album.albumCover} alt={album.title} />
               <div className="mdl-cell mdl-cell--3-col mdl-cell--middle">{album.title}</div>
               <div className="mdl-cell mdl-cell--3-col mdl-cell--middle">{album.artist}</div>
               <div className="mdl-cell mdl-cell--3-col mdl-cell--middle">{album.songs.length} songs</div>
            </Link>
          )
        }
       </section>
      );
    }
  }

export default Library;