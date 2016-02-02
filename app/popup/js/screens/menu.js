/* global chrome */
import React, {Component} from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { url as isIPFSUrl } from 'is-ipfs'

import StartScreen from './menu/start'
import ProfileScreen from './menu/profile'
import Loader from '../components/view/loader'

import '../../styles/animations.less'

const INITIALIZING = 'initializing'
const RUNNING = 'running'
const STOPPED = 'stopped'

const WEB_UI_URL = 'http://localhost:5001/ipfs/QmRyWyKWmphamkMRnJVjUTzSFSAAZowYP4rnbgnfMXC9Mr'

function copyToClipboard (str) {
  document.oncopy = (event) => {
    event.clipboardData.setData('Text', str)
    event.preventDefault()
  }

  document.execCommand('Copy')
  document.oncopy = undefined
}

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
    this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this)

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

    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (isIPFSUrl(tabs[0].url)) {
        this.setState({
          isIpfsPage: true,
          pageUrl: tabs[0].url
        })
      }
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

  handleCopyToClipboard (type) {
    const pattern = /^https?:\/\/[^\/]+\/(ip(f|n)s)\/(\w+)/
    const matches = this.state.pageUrl.match(pattern)

    const address = `/${matches[1]}/${matches[3]}`

    switch (type) {
      case 'public-address':
        return copyToClipboard(`https://ipfs.io${address}`)
      case 'address':
        return copyToClipboard(address)
    }

    // copyToClipboard
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
            isIpfsPage={this.state.isIpfsPage}
            pageUrl={this.state.pageUrl}
            onOptionsClick={this.handleOptionsClick}
            onRedirectClick={this.handleRedirectClick}
            onWebUIClick={this.handleWebUIClick}
            onCopyToClipboard={this.handleCopyToClipboard}
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
