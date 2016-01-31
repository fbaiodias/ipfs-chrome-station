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

    const parsed = JSON.parse(res)

    chrome.browserAction.setBadgeBackgroundColor({ color: '#0000ff' })
    chrome.browserAction.setBadgeText({ text: parsed.Strings.length.toString() })
  })

  // ipfs.cat(['QmPQN7bUeCsYpLzkcNRWicE6C2o4XAG96x2AANNRz9J3aL'], (err, res) => {
  //   if (err || !res) return console.error(err)
  //   console.log('got pic')
  // })
}

updatePeersCount()

setInterval(updatePeersCount, UPDATE_INTERVAL)
