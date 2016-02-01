/* global chrome */
import React, {Component} from 'react'
import Settings from './settings'

const settingsKeys = ['redirecting', 'host', 'port', 'apiPort', 'apiInterval']

export default class Menu extends Component {

  state = {};

  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    chrome.storage.sync.get(settingsKeys, (settings) => {
      console.log('got settings', settings)
      this.setState(settings)
    })
  }

  handleSubmit (values) {
    chrome.storage.sync.set(values, () => {
      console.log('saved settings', values)
      window.close()
    })
  }

  render () {
    return (
      <Settings
        key='settings-screen'
        settings={this.state}
        onSubmit={this.handleSubmit}
        />
    )
  }
}
