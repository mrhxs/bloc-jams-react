import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayBar from './PlayBar';

class Album extends Component {
  constructor(props) {
    super(props);
     
     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });
 
     this.state = {
       album,
       currentSong: album.songs[0],
       currentTime: 0,
       duration: album.songs[0].duration, 
       isPlaying: false,
       hoveringSong: null,
       volume: 0.5
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeupdate: e => {
        this.setState({
          currentVolume: this.audioElement.volume
        });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener("volumeupdate", this.eventListeners.volumeupdate);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }


  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(4, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  hoverOn(song) {
    this.setState({
      hoveringSong: song
    });
  }

  hoverOff() {
    this.setState({
      hoveringSong: null
    });
  }

  togglePlay(song, index) {
    return this.state.isPlaying && this.state.currentSong === song ? (
      <td>
        <span className="ion-md-pause" />
      </td>
    ) : this.state.hoveringSong === index + 1 ? (
      <td>
        <span className="ion-md-play" />
      </td>
    ) : (
      <td>{index + 1 + '.'}</td>
    );
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({
      volume: newVolume
    });
  }

  formatTime(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
    return isNaN(time)
      ? "-:--"
      : seconds < 10
        ? minutes.toString() + ":0" + seconds.toString()
        : minutes.toString() + ":" + seconds.toString();
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
             </div>
        </section>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>  
            <tbody id="songs">
              {
                this.state.album.songs.map((song, index, array) => (
                <tr 
                  className="song table"
                  key={index} 
                  onClick={() => this.handleSongClick(song)}
                  onMouseEnter={() => this.hoverOn(index + 1)}
                  onMouseLeave={() => this.hoverOff()}
                >
                  {this.togglePlay(song, index)}
                  <td> {song.title} </td> 
                  <td>{this.formatTime(song.duration)}</td>
                </tr>
                ))
              }
            </tbody>
          </table>
          <PlayBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.formatTime(this.audioElement.currentTime)}
           duration={this.formatTime(this.audioElement.duration)}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           currentVolume={this.audioElement.volume}
           handleVolumeChange={e => this.handleVolumeChange(e)}
           formatTime={time => this.formatTime(time)}
           />
        </section>
    );
  }
}

export default Album;      
