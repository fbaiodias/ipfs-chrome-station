/* global chrome  */
import url from 'url'

// TODO: replace regex with 3rd party library provided by IPFS community
// Ref. https://github.com/ipfs/notes/issues/92#issuecomment-172135885
const IPFS_RESOURCE = /^https?:\/\/[^\/]+\/ip(f|n)s\//
const IPFS_LOCAL_HOST = 'localhost:8080'

function isIPFSUrl (_url) {
  return _url.match(IPFS_RESOURCE)
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log('intercept', details.url)
    var parsedUrl = url.parse(details.url)
    if (isIPFSUrl(details.url) && parsedUrl.host !== IPFS_LOCAL_HOST) {
      parsedUrl.protocol = 'http:'
      parsedUrl.host = IPFS_LOCAL_HOST
      parsedUrl.hostname = IPFS_LOCAL_HOST
      const localUrl = url.format(parsedUrl)
      console.log('redirected', details.url, 'to', IPFS_LOCAL_HOST)
      return { redirectUrl: localUrl }
    }
    return
  },
  { urls: ['*://*/ipfs/*', '*://*/ipns/*'] },
  ['blocking']
)
