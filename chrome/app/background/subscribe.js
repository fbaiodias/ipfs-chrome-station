/* global chrome  */
import ipfsAPI from 'ipfs-api'

const ipfs = ipfsAPI()

const UPDATE_INTERVAL = 5000

function updatePeersCount () {
  ipfs.swarm.peers((err, res) => {
    if (err) {
      chrome.storage.local.set({
        'peersCount': 0,
        'running': false
      })
      return
    }

    chrome.storage.local.set({
      'peersCount': res.Strings.length,
      'running': true
    })
  })
}

// reset initial state
chrome.storage.local.set({
  running: false,
  peersCount: 0
}, () => {
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    Object.keys(changes).forEach(key => {
      console.log(key, 'changed', changes[key])
    })
  })

  updatePeersCount()
  setInterval(updatePeersCount, UPDATE_INTERVAL)
})
