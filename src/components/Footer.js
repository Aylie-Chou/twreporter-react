import React, { Component, PropTypes } from 'react'
if (process.env.BROWSER) {
      require("./Footer.css");
}

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="footer">
                <a href="#" className="footer-item  about">ABOUT</a>    
                <a href="#" className="footer-item  privacy-policy">PRIVACY-POLICY</a>
                <span className="footer-item right-reserved">© THE REPORTER ALL RIGHTS RESERVED.</span>
            </div>
        )
    }
}

