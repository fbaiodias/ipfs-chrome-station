import React, {Component, PropTypes} from 'react'
import Radium from 'radium'

import Header from '../../components/view/header'

import 'normalize.css'
import 'css-box-sizing-border-box/index.css'
import '../../../styles/common.less'
import '../../../styles/fonts.less'

@Radium
export default class StartScreen extends Component {
  static propTypes = {
    onReportProblemClick: PropTypes.func
  };

  static defaultProps = {
    onReportProblemClick () {}
  };

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
      content: {
        display: 'flex',
        flex: '1',
        margin: '40px 0',
        flexDirection: 'column'
      },
      text: {
        padding: '40px 0',
        textAlign: 'center'
      },
      link: {
        cursor: 'pointer',
        textAlign: 'center',
        textDecoration: 'underline'
      }
    }

    return (
      <div style={styles.wrapper}>
        <Header />
        <div style={styles.content}>
          <image
           src={require('../../../img/offline-icon.png')}
           width='64'
           height='64'
           style={{margin: '0 auto'}}
          />
          <div style={styles.text}>
            <p>Oh snap, it looks like your node is not running yet.</p>
            <p>Please start it by running <code>ipfs daemon</code> on your terminal.</p>
            <p>
              Also, please make sure you have CORS enabled, by running <br/>
              <code>{`ipfs config --json API.HTTPHeaders '{"Access-Control-Allow-Origin": ["*"]}'`}</code>
            </p>
          </div>
          <a onClick={this.props.onReportProblemClick} style={styles.link}>Report a problem</a>
        </div>
      </div>
    )
  }
}
