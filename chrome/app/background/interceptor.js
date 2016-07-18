/* global chrome  */
import url from 'url'
import { url as isIPFSUrl } from 'is-ipfs'
import base32 from 'base32'

const settingsKeys = ['redirecting', 'host', 'port']
let settings = {}

const isIPFSCloudUrl = (url) => url.indexOf('ipfs-cloud.dev') !== -1

function interceptor (details) {
  const node = `${settings.host}:${settings.port}`
  const parsedUrl = url.parse(details.url)

  if (isIPFSUrl(details.url) && parsedUrl.host.indexOf(settings.host) === -1) {
    parsedUrl.protocol = 'http:'
    parsedUrl.host = node
    parsedUrl.hostname = node
    const localUrl = url.format(parsedUrl)
    console.log('redirected', details.url, 'to', node)
    return { redirectUrl: localUrl }
  }

  if (isIPFSCloudUrl(details.url)) {
    const splitted = parsedUrl.host.split('.')
    const base32Hash = splitted[0] + splitted[1]
    const ipfsHash = base32.decode(base32Hash)
    const ipfsPath = `/ipfs/${ipfsHash}${parsedUrl.path}`

    const localUrl = url.format({
      protocol: 'http:',
      host: node,
      pathname: ipfsPath
    })

    console.log('redirected', details.url, 'to', localUrl)
    return { redirectUrl: localUrl }
  }

  return
}

function startInterceptor () {
  console.log('starting interceptor')
  chrome.webRequest.onBeforeRequest.addListener(interceptor,
    {
      urls: [
        '*://*/ipfs/*',
        '*://*/ipns/*',
        '*://*.ipfs-cloud.dev/*'
      ]
    },
    ['blocking']
  )
}

function stopInterceptor () {
  console.log('stopping interceptor')
  chrome.webRequest.onBeforeRequest.removeListener(interceptor)
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  Object.keys(changes).forEach(key => {
    var storageChange = changes[key]

    if (settingsKeys.indexOf(key) !== -1) {
      settings[key] = storageChange.newValue
    }

    if (key === 'redirecting') {
      if (storageChange.newValue === true) {
        startInterceptor()
      } else {
        stopInterceptor()
      }
    } else if (key === 'running') {
      if (storageChange.newValue === true) {
        chrome.storage.sync.get('redirecting', function (result) {
          if (result.redirecting === true) {
            startInterceptor()
          }
        })
      } else {
        stopInterceptor()
      }
    }
  })
})

chrome.storage.sync.get(settingsKeys, (result) => {
  settings = result

  const { redirecting } = settings
  if (redirecting === true) {
    chrome.storage.local.get('running', ({ running }) => {
      if (running === true) {
        startInterceptor()
      }
    })
  }
})
