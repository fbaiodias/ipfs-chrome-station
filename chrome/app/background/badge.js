/* global chrome  */
import ipfsAPI from 'ipfs-api'

const ipfs = ipfsAPI()

const UPDATE_INTERVAL = 2000

function updatePeersCount () {
  ipfs.swarm.peers((err, res) => {
    if (err) {
      console.error('error getting peers', err)
      chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' })
      chrome.browserAction.setBadgeText({ text: 'off' })
      return
    }

    chrome.browserAction.setBadgeBackgroundColor({ color: '#0000ff' })
    chrome.browserAction.setBadgeText({ text: res.Strings.length.toString() })
  })
}

updatePeersCount()

setInterval(updatePeersCount, UPDATE_INTERVAL)
