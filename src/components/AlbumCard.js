import React, { Component } from 'react';
import '../css/album-card.css';

export default class AlbumCard extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        const { album } = this.props
        return (
            <div className="album-card" onClick={() => this.props.openModal()} >
                <img src={album.artworkUrl100} alt={album.collectionName} />
                <div className="album-card-info" >
                    <h4 className="album-name" >{album.collectionName}</h4>
                    <small className="artist-name" >By {album.artistName}</small>
                    <br/>
                    <small>Released in {album.releaseDate.substring(0, album.releaseDate.length - (album.releaseDate.length-4) )}</small>
                </div>
                <span className="album-price" >
                    <i className="fas fa-dollar-sign"></i>
                    <span>{album.collectionPrice ? album.collectionPrice : '0.00'}</span>
                </span>
            </div>
        )
    }
}
