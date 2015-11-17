/* global chrome  */
import ipfsAPI from 'ipfs-api'

const ipfs = ipfsAPI('localhost', '5001')

const UPDATE_INTERVAL = 2000

function updatePeersCount () {
  ipfs.swarm.peers((err, res) => {
    if (err) {
      console.log('error getting peers')
      chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' })
      chrome.browserAction.setBadgeText({ text: 'off' })
      return
    }

    const parsed = JSON.parse(res)

    chrome.browserAction.setBadgeBackgroundColor({ color: '#0000ff' })
    chrome.browserAction.setBadgeText({ text: parsed.Strings.length.toString() })
  })
}

updatePeersCount()

setInterval(updatePeersCount, UPDATE_INTERVAL)
