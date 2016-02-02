/* global chrome */
import React, {Component} from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

import StartScreen from './menu/start'
import ProfileScreen from './menu/profile'
import Loader from '../components/view/loader'

import '../../styles/animations.less'

const INITIALIZING = 'initializing'
const RUNNING = 'running'
const STOPPED = 'stopped'

const WEB_UI_URL = 'http://localhost:5001/ipfs/QmRyWyKWmphamkMRnJVjUTzSFSAAZowYP4rnbgnfMXC9Mr'

export default class Menu extends Component {

  state = {
    status: INITIALIZING,
    connected: false,
    version: null,
    stats: {}
  };

  constructor (props) {
    super(props)

    this.handleStorageChange = this.handleStorageChange.bind(this)
    this.handleRedirectClick = this.handleRedirectClick.bind(this)
    this.handleWebUIClick = this.handleWebUIClick.bind(this)
    this.handleOptionsClick = this.handleOptionsClick.bind(this)

    chrome.storage.onChanged.addListener(this.handleStorageChange)

    chrome.storage.local.get(null, (result) => {
      this.setState({
        ...result,
        status: result.running ? RUNNING : STOPPED
      })
    })

    chrome.storage.sync.get(null, (result) => {
      this.setState(result)
    })
  }

  handleStorageChange (changes, namespace) {
    const nextState = {}
    Object.keys(changes).forEach(key => {
      const storageChange = changes[key]

      nextState[key] = storageChange.newValue

      if (key === 'running') {
        nextState.status = storageChange.newValue ? RUNNING : STOPPED
      }
    })

    console.log('nextState', nextState)

    this.setState(nextState)
  }

  handleRedirectClick () {
    const redirecting = !this.state.redirecting

    chrome.storage.sync.set({
      redirecting
    })
  }

  handleWebUIClick () {
    chrome.tabs.create({ url: WEB_UI_URL })
  }

  handleOptionsClick () {
    chrome.runtime.openOptionsPage()
  }

  getScreen () {
    switch (this.state.status) {
      case RUNNING:
        return (
          <ProfileScreen
            key='profile-screen'
            agentVersion={this.state.agentVersion}
            protocolVersion={this.state.protocolVersion}
            host={this.state.host}
            port={this.state.port}
            peers={this.state.peersCount}
            location={this.state.location}
            redirecting={this.state.redirecting}
            onOptionsClick={this.handleOptionsClick}
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
