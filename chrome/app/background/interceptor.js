/* global chrome  */
import url from 'url'
import { url as isIPFSUrl } from 'is-ipfs'

const settingsKeys = ['redirecting', 'host', 'port']
let settings = {}

function interceptor (details) {
  var parsedUrl = url.parse(details.url)
  if (isIPFSUrl(details.url) && parsedUrl.host.indexOf(settings.host) === -1) {
    const node = `${settings.host}:${settings.port}`

    parsedUrl.protocol = 'http:'
    parsedUrl.host = node
    parsedUrl.hostname = node
    const localUrl = url.format(parsedUrl)
    console.log('redirected', details.url, 'to', node)
    return { redirectUrl: localUrl }
  }
  return
}

function startInterceptor () {
  console.log('starting interceptor')
  chrome.webRequest.onBeforeRequest.addListener(interceptor,
    { urls: ['*://*/ipfs/*', '*://*/ipns/*'] },
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
