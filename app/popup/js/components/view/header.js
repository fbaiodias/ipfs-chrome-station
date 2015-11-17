import React, {Component} from 'react'
import Radium from 'radium'

import IPFSLogo from './ipfs-logo'

@Radium
export default class Header extends Component {
  render () {
    const styles = {
      wrapper: {
        display: 'flex',
        height: '40px'
      },
      text: {
        alignSelf: 'center',
        flex: '1',
        paddingTop: '4px'
      },
      stopButton: {
        background: 'none',
        border: 'none',
        position: 'absolute',
        top: '11px',
        right: '0'
      }
    }

    return (
      <div style={styles.wrapper}>
        <div style={styles.text}>
          <IPFSLogo />
        </div>
      </div>
    )
  }
}
