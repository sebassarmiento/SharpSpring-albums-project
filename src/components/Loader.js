import React, { Component } from 'react'
import Logo from '../img/favicon.png'

export default class Loader extends Component {
    render() {
        return (
            <div className="loader" >
                <img src={Logo} alt="Loading" />
                <span>Loading...</span>
            </div>
        )
    }
}
