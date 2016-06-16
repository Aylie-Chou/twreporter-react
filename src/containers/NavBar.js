import _ from 'lodash'
import { connect } from 'react-redux'
import { setReadProgress } from '../actions/header'
import DesktopNavBar from '../components/navigation/DesktopNavBar'
import HeaderProgress from '../components/navigation/HeaderProgress'
import MobileNavBar from '../components/navigation/MobileNavBar'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

const DEFAULT_HEIGHT = 10

if (process.env.BROWSER) {
  require('./NavBar.css')
  require('./NavBurg.css')
}

class NaviBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 10
    }
    this._renderMobile = this._renderMobile.bind(this)
    this._getHeaderHeight = this._getHeaderHeight.bind(this)
  }

  componentDidMount() {
    this._getHeaderHeight()
    window.addEventListener('resize', this._getHeaderHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._getHeaderHeight)
  }

  _getHeaderHeight() {
    const rect = ReactDOM.findDOMNode(this.refs.headerbox).getBoundingClientRect()
    this.setState({
      height: _.get(rect, 'height', DEFAULT_HEIGHT)
    })
  }

  shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line
    if(nextState.height !== this.state.height ||
       nextProps.header.readPercent !== this.props.header.readPercent) {
      return true
    }
    if (nextProps.path === this.props.path) {
      return false
    }
    return true
  }

  _renderMobile() {
    return (
      <div className="mobile-nav">
        <MobileNavBar {...this.props}/>
      </div>
    )
  }

  _renderDesktop() {
    return (
      <div className="desktop-nav">
        <DesktopNavBar {...this.props}/>
      </div>
    )
  }

  render() {
    const { height } = this.state
    const { header } = this.props
    const percent = header.readPercent || 0

    return (
      <div style={{ height: height+'px' }}>
        <div ref="headerbox" className="fixTop">
          {this._renderMobile()}
          {this._renderDesktop()}
          <HeaderProgress percent={percent}/>
        </div>
      </div>
    )
  }
}

NaviBar.contextTypes = {
  device: PropTypes.string
}

function mapStateToProps(state) {
  return {
    header: state.header || {}
  }
}

export default connect(mapStateToProps, { setReadProgress })(NaviBar)
