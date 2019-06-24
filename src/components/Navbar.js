import React, { Component } from 'react';
import Logo from '../img/favicon.png';
import '../css/navbar.css';

export default class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: ''
        }
    }

    componentDidMount(){
        this.setState({ search: this.props.query })
    }

    handleChange(e){
        this.setState({ search: e.target.value })
    }

    handleSearch(key){
        if(this.state.search.length > 0){
            console.log('Se llama')
            if(!key){
                this.props.newSearch(this.state.search)
            } else if(key.key === 'Enter'){
                this.props.newSearch(this.state.search)
            }
        }
    }

    render() {
        return (
            <div className="navbar" >
                <img src={Logo} alt="Music Albums" />
                <h2>Sharpspring Project</h2>
                <div className="searchbar" >

                    <input 
                        onKeyPress={e => this.handleSearch(e)}
                        onChange={e => this.handleChange(e)} 
                        type="text" 
                        placeholder="Search albums..."
                        maxlength="50"
                    />

                    <i onClick={() => this.handleSearch()} className="fas fa-search" ></i>
                </div>
            </div>
        )
    }
}
