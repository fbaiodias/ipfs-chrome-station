import React, {Component, PropTypes} from 'react'
import Radium from 'radium'

import IPFSLogo from './ipfs-logo'

@Radium
export default class Header extends Component {
  static propTypes = {
    style: PropTypes.object
  };

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
      }
    }

    return (
      <div style={[styles.wrapper, this.props.style]}>
        <div style={styles.text}>
          <IPFSLogo />
        </div>
      </div>
    )
  }
}
