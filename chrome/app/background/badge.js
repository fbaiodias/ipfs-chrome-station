/* global chrome  */

chrome.storage.onChanged.addListener(function (changes, namespace) {
  Object.keys(changes).forEach(key => {
    const storageChange = changes[key]

    if (key === 'running' && storageChange.newValue === false) {
      chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' })
      chrome.browserAction.setBadgeText({ text: 'off' })
    } else if (key === 'peersCount') {
      chrome.browserAction.setBadgeBackgroundColor({ color: '#0000ff' })
      chrome.browserAction.setBadgeText({ text: storageChange.newValue.toString() })
    }
  })
})
