/* global chrome  */
import url from 'url'
import { url as isIPFSUrl } from 'is-ipfs'

const IPFS_LOCAL_HOST = 'localhost:8080'

function interceptor (details) {
  var parsedUrl = url.parse(details.url)
  if (isIPFSUrl(details.url) && parsedUrl.host.indexOf('localhost') === -1) {
    parsedUrl.protocol = 'http:'
    parsedUrl.host = IPFS_LOCAL_HOST
    parsedUrl.hostname = IPFS_LOCAL_HOST
    const localUrl = url.format(parsedUrl)
    console.log('redirected', details.url, 'to', IPFS_LOCAL_HOST)
    return { redirectUrl: localUrl }
  }
  return
}

function startInterceptor () {
  chrome.webRequest.onBeforeRequest.addListener(interceptor,
    { urls: ['*://*/ipfs/*', '*://*/ipns/*'] },
    ['blocking']
  )
}

function stopInterceptor () {
  chrome.webRequest.onBeforeRequest.removeListener(interceptor)
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  Object.keys(changes).forEach(key => {
    var storageChange = changes[key]
    if (storageChange.newValue === true) {
      startInterceptor()
    } else {
      stopInterceptor()
    }
  })
})

chrome.storage.sync.get('redirecting', function (result) {
  console.log('get redirecting', result)
  if (result.redirecting === true) {
    startInterceptor()
  }
})
