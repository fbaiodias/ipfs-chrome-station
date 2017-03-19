/* global chrome  */
import ipfsAPI from 'ipfs-api'
import { get } from 'lodash'

const settingsKeys = ['host', 'apiPort', 'apiInterval']
let settings = {}

let ipfs
let updateInterval

function connectToAPI () {
  ipfs = ipfsAPI(settings.host, settings.apiPort)
  console.log('changed api to', settings.host, settings.apiPort)

  ipfs.id((err, peer) => {
    if (err) return

    chrome.storage.local.set({
      id: peer.id,
      agentVersion: peer.agentVersion,
      protocolVersion: peer.protocolVersion
    })
  })
}

function updatePeersCount () {
  ipfs.swarm.peers((err, res) => {
    if (err) {
      chrome.storage.local.set({
        peersCount: 0,
        running: false
      })
      return
    }

    chrome.storage.local.set({
      peersCount: res.length,
      running: true
    })
  })
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  let needsRestart = false
  Object.keys(changes).forEach(key => {
    var storageChange = changes[key]

    if (settingsKeys.indexOf(key) !== -1) {
      settings[key] = storageChange.newValue
    }

    needsRestart = (key === 'host' || key === 'apiPort')

    if (key === 'apiInterval' && updateInterval) {
      clearInterval(updateInterval)
      updateInterval = setInterval(updatePeersCount, settings.apiInterval)
      console.log('changed update interval to', settings.apiInterval)
    }
  })

  if (needsRestart) {
    connectToAPI()
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method) {
    const method = get(ipfs, request.method)
    const args = request.args || []

    args.push(function () {
      console.log(request.method, 'result', arguments)
      sendResponse(arguments)
    })

    console.log('executing', request.method)
    method.apply(null, args)

    return true
  }
})

chrome.storage.sync.get(settingsKeys, (result) => {
  settings = result

  connectToAPI()

  updatePeersCount()
  updateInterval = setInterval(updatePeersCount, settings.apiInterval)
})
