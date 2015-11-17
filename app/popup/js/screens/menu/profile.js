import React, {Component, PropTypes} from 'react'
import Radium from 'radium'

import SimpleStat from '../../components/view/simple-stat'
import Header from '../../components/view/header'
import Icon from '../../components/view/icon'

import 'normalize.css'
import 'css-box-sizing-border-box/index.css'
import '../../../styles/common.less'
import '../../../styles/fonts.less'
import '../../../styles/file-drop.less'

@Radium
export default class ProfileScreen extends Component {

  static propTypes = {
    peers: PropTypes.number,
    location: PropTypes.string,
    onStopClick: PropTypes.func,
    onConsoleClick: PropTypes.func,
    onBrowserClick: PropTypes.func,
    onSettingsClick: PropTypes.func,
    onCloseClick: PropTypes.func
  }

  static defaultProps = {
    peers: 0,
    location: '',
    onStopClick () {},
    onConsoleClick () {},
    onBrowserClick () {},
    onSettingsClick () {},
    onCloseClick () {}
  }

  _onFileDrop = (files, event) => {
    const filesArray = []
    for (let i = 0; i < files.length; i++) {
      filesArray.push(files[i].path)
    }
  }

  render () {
    const styles = {
      wrapper: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#19b5fe',
        color: '#FFFFFF',
        flexDirection: 'column',
        alignItems: 'center'
      },
      image: {
        display: 'flex',
        flex: '1',
        color: '#FFFFFF',
        backgroundImage: `url(${require('../../../img/stars.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: '0 0',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      },
      stats: {
        padding: '20px',
        display: 'flex',
        flex: '1',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        width: '100%',
        height: '30%',
        justifyContent: 'space-around'
      },
      footer: {
        display: 'flex',
        height: '70px',
        justifyContent: 'space-around',
        width: '100%'
      }
    }

    return (
      <div style={styles.wrapper}>
        <Header onCloseClick={this.props.onCloseClick}/>
        <div style={styles.image}>
          <Icon name='location' style={{padding: '10px 0', fontSize: '32px'}}/>
          <div style={{margin: '0 auto'}}>
            {this.props.location}
          </div>
        </div>
        <div style={styles.stats}>
          <SimpleStat
            name='peers'
            value={this.props.peers}
            color='#50d2c2'
          />
        </div>
        <div style={styles.footer}>
        </div>
      </div>
    )
  }
}
