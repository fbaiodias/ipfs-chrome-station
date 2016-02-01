import React, { Component, PropTypes } from 'react'
import { Toggle, TextInput, Button } from 'belle'

export default class Settings extends Component {
  state = {};

  static propTypes = {
    settings: PropTypes.object,
    onSubmit: PropTypes.func
  };

  constructor (props) {
    super(props)

    this.state = props.settings
  }

  componentWillReceiveProps (nextProps) {
    const {
      redirecting = this.state.redirecting,
      host = this.state.host,
      port = this.state.port,
      apiPort = this.state.apiPort,
      apiInterval = this.state.apiInterval
    } = nextProps.settings

    this.setState({ redirecting, host, port, apiPort, apiInterval })
  }

  handleChange (field, { value }) {
    console.log('change', field, value)
    const nextState = {
      [field]: value
    }

    this.setState(nextState)
  }

  handleSubmit () {
    this.props.onSubmit(this.state)
  }

  render () {
    const {
      redirecting,
      host,
      port,
      apiPort,
      apiInterval
    } = this.state

    const style = {
      toggle: {
        base: {
          transform: 'scale(0.7)',
          verticalAlign: 'middle',
          marginLeft: '-8px'
        },
        label: {
          fontSize: '14px',
          verticalAlign: 'sub'
        }
      },
      node: {
        paddingLeft: '10px'
      },
      button: {
        marginTop: '20px'
      }
    }

    return (
      <form>
        <div>
          <Toggle
            value={redirecting}
            onUpdate={this.handleChange.bind(this, 'redirecting')}
            style={style.toggle.base}
            />
          <label style={style.toggle.label}>Redirecting</label>
        </div>

        <h2>IPFS node details</h2>
        <div style={style.node}>
          <TextInput
            value={host}
            placeholder='host'
            onUpdate={this.handleChange.bind(this, 'host')}
          />
          <TextInput
            value={port}
            placeholder='port'
            onUpdate={this.handleChange.bind(this, 'port')}
          />
          <TextInput
            value={apiPort}
            placeholder='API port'
            onUpdate={this.handleChange.bind(this, 'apiPort')}
          />
          <TextInput
            value={apiInterval}
            placeholder='API update interval (ms)'
            onUpdate={this.handleChange.bind(this, 'apiInterval')}
          />
        </div>

        <Button
          primary
          style={style.button}
          onClick={this.handleSubmit.bind(this)}
        >
          Save
        </Button>
      </form>

    )
  }
}
