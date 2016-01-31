/* global chrome, localStorage */
import React, {Component} from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

import StartScreen from './menu/start'
import ProfileScreen from './menu/profile'
import Loader from '../components/view/loader'

import '../../styles/animations.less'

const INITIALIZING = 'initializing'
const RUNNING = 'running'
const STOPPED = 'stopped'

const UPDATE_INTERVAL = 2000

const WEB_UI_URL = 'http://localhost:5001/ipfs/QmRyWyKWmphamkMRnJVjUTzSFSAAZowYP4rnbgnfMXC9Mr'

import ipfsAPI from 'ipfs-api'

const ipfs = window.ipfs = ipfsAPI()

export default class Menu extends Component {

  state = {
    status: INITIALIZING,
    connected: false,
    version: null,
    stats: {}
  };

  constructor (props) {
    super(props)

    this.updateStats = this.updateStats.bind(this)

    this.handleIpfsId = this.handleIpfsId.bind(this)
    this.handleIpfsPeers = this.handleIpfsPeers.bind(this)
    this.handleRedirectClick = this.handleRedirectClick.bind(this)
    this.handleWebUIClick = this.handleWebUIClick.bind(this)

    this.state.redirecting = (localStorage.getItem('redirecting') === 'true')
  }

  componentDidMount () {
    ipfs.id(this.handleIpfsId)

    this.updateStats()

    setInterval(() => {
      this.updateStats()
    }, UPDATE_INTERVAL)
  }

  updateStats () {
    ipfs.swarm.peers(this.handleIpfsPeers)
  }

  handleIpfsId (err, res) {
    if (err) {
      console.error(err)
      this.setState({
        status: STOPPED
      })

      return
    }

    this.setState({
      status: RUNNING,
      id: res.ID,
      version: res.AgentVersion,
      protocolVersion: res.ProtocolVersion
    })
  }

  handleIpfsPeers (err, res) {
    if (err) {
      console.log('error getting peers', err)
      this.setState({
        status: STOPPED
      })
      return
    }

    this.setState({
      status: RUNNING,
      peers: res.Strings.length
    })
  }

  handleRedirectClick () {
    const redirecting = !(localStorage.getItem('redirecting') === 'true')
    localStorage.setItem('redirecting', redirecting)

    this.setState({
      redirecting
    })
  }

  handleWebUIClick () {
    chrome.tabs.create({ url: WEB_UI_URL })
  }

  getScreen () {
    switch (this.state.status) {
      case RUNNING:
        return (
          <ProfileScreen
            key='profile-screen'
            peers={this.state.peers}
            location={this.state.location}
            redirecting={this.state.redirecting}
            onRedirectClick={this.handleRedirectClick}
            onWebUIClick={this.handleWebUIClick}
            />
        )
      case INITIALIZING:
        return <Loader key='loader-screen' />
      default:
        return <StartScreen key='start-screen' onStartClick={this._startDaemon}/>
    }
  }

  render () {
    return (
      <CSSTransitionGroup
        transitionName='fade'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
        >
        {this.getScreen()}
      </CSSTransitionGroup>
    )
  }
}
