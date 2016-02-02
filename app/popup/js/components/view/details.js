import React, {Component, PropTypes} from 'react'
import Radium from 'radium'

@Radium
export default class Details extends Component {
  static propTypes = {
    agentVersion: PropTypes.string,
    protocolVersion: PropTypes.string,
    host: PropTypes.string,
    port: PropTypes.number
  };

  static defaultProps = {
    peer: {}
  };

  render () {
    const styles = {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
      },
      entry: {
        color: 'rgba(0, 0, 0, 0.5)',
        padding: '2px 0',
        fontSize: '13px',
        fontWeight: '500'
      },
      title: {
        fontWeight: 'bold',
        fontSize: '20px'
      }
    }

    return (
      <div style={styles.wrapper}>
        <div style={styles.title}>
          Details
        </div>
        <div style={styles.entry}>
          Agent: {this.props.agentVersion}
        </div>
        <div style={styles.entry}>
          Protocol: {this.props.protocolVersion}
        </div>
        <div style={styles.entry}>
          Gateway: {`${this.props.host}:${this.props.port}`}
        </div>
      </div>
    )
  }
}
