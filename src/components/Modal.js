import React, { Component } from 'react';
import '../css/modal.css';

export default class Modal extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render() {
        const { data } = this.props
        return (
            <div className="modal-bg" >
                <div className="modal-container" >

                    <i onClick={() => this.props.closeModal()} className="fas fa-times close-modal"></i>
                    
                    <div className="modal-main-info" >
                        <img src={data.artworkUrl100} alt={data.collectionName} />
                        <div>
                            <h4>{data.collectionName}</h4>
                            <small>By {data.artistName}</small>
                        </div>
                    </div>
                    <div className="modal-extra-info" >
                        <div>
                            <i className="fas fa-dollar-sign"><span>{data.collectionPrice}</span></i>
                            <p>Price in {data.currency}</p>
                        </div>
                        <div>
                            <i className="fas fa-compact-disc"><span>{data.trackCount}</span></i>
                            <p>Tracks</p>
                        </div>
                        <div>
                            <i className="fas fa-desktop"></i>
                            <p><a target="_blank" rel="noopener noreferrer" href={data.collectionViewUrl} >Website</a></p>
                        </div>
                        <div>
                            <i className="fas fa-flag"></i>
                            <p>{data.country}</p>
                        </div>
                        <div>
                            <i className="fas fa-music"></i>
                            <p>{data.primaryGenreName}</p>
                        </div>
                        <div>
                            <i className="fas fa-calendar-alt"></i>
                            <p>{data.releaseDate.substring(0, 10).split('-').reverse().join('/') }</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
