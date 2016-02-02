import React, {Component, PropTypes} from 'react'
import Radium from 'radium'

import SimpleStat from '../../components/view/simple-stat'
import IconButton from '../../components/view/icon-button'
import Header from '../../components/view/header'
import Icon from '../../components/view/icon'
import Details from '../../components/view/details'

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
    redirecting: PropTypes.bool,
    agentVersion: PropTypes.string,
    protocolVersion: PropTypes.string,
    host: PropTypes.string,
    port: PropTypes.string,
    isIpfsPage: PropTypes.bool,
    pageUrl: PropTypes.string,
    pinned: PropTypes.bool,
    onRedirectClick: PropTypes.func,
    onWebUIClick: PropTypes.func,
    onOptionsClick: PropTypes.func,
    onCopyToClipboard: PropTypes.func,
    onPinClick: PropTypes.func
  };

  static defaultProps = {
    peers: 0,
    location: '',
    onRedirectClick () {},
    onWebUIClick () {},
    onOptionsClick () {},
    onCopyToClipboard () {},
    onPinClick () {}
  };

  render () {
    const styles = {
      wrapper: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${require('../../../img/stars.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: '0 10%',
        color: '#FFFFFF',
        flexDirection: 'column',
        alignItems: 'center'
      },
      header: {
        height: this.props.location ? '40px' : '60px'
      },
      location: {
        display: 'flex',
        flex: '1',
        color: '#FFFFFF',
        width: '100%',
        minHeight: '30px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '10px 0'
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
      actions: {
        display: 'flex',
        height: '70px',
        justifyContent: 'space-around',
        backgroundColor: '#19b5fe',
        width: '100%'
      },
      pageActions: {
        wrapper: {
          width: '100%',
          backgroundImage: `url(${require('../../../img/stars.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: '0 90%'
        },
        header: {
          textAlign: 'center',
          fontSize: '16px',
          padding: '10px'
        },
        buttons: {
          display: 'flex',
          height: '70px',
          justifyContent: 'space-around',
          width: '100%'
        }
      }
    }

    const pageActions = this.props.isIpfsPage ? (
      <div style={styles.pageActions.wrapper}>
        <div style={styles.pageActions.header}>
          Current address actions
        </div>
        <div style={styles.pageActions.buttons}>
          <IconButton
            name='Copy public url'
            icon='forward'
            onClick={this.props.onCopyToClipboard.bind(null, 'public-address')}
            />
          <IconButton
            name='Copy canonical address'
            icon='forward'
            onClick={this.props.onCopyToClipboard.bind(null, 'address')}
            />
          <IconButton
            name={this.props.pinned ? 'Unpin resource' : 'Pin resource'}
            icon={this.props.pinned ? 'cross' : 'star'}
            onClick={this.props.onPinClick}
            />
        </div>
      </div>
    ) : null

    const location = this.props.location ? (
      <div style={styles.location}>
        <Icon name='location' style={{fontSize: '32px'}}/>
        <div style={{margin: '0 auto'}}>
          {this.props.location}
        </div>
      </div>
    ) : null

    return (
      <div style={styles.wrapper}>
        <Header style={styles.header}/>
        {location}
        <div style={styles.stats}>
          <Details
            agentVersion={this.props.agentVersion}
            protocolVersion={this.props.protocolVersion}
            host={this.props.host}
            port={this.props.port}
          />
          <SimpleStat
            name='peers'
            value={this.props.peers}
            color='#50d2c2'
          />
        </div>
        <div style={styles.actions}>
          <IconButton
            name='Options'
            icon='gear'
            onClick={this.props.onOptionsClick}
            />
          <IconButton
            name='WebUI'
            icon='window'
            onClick={this.props.onWebUIClick}
            />
          <IconButton
            name={this.props.redirecting ? 'Stop redirecting' : 'Start redirecting'}
            icon={this.props.redirecting ? 'media-stop' : 'media-play'}
            onClick={this.props.onRedirectClick}
            />
        </div>
        {pageActions}
      </div>
    )
  }
}
