/* global chrome  */

const defaultValues = {
  redirecting: false,
  host: 'localhost',
  port: 8080,
  apiPort: 5001,
  apiInterval: 5000
}

chrome.storage.local.set({
  running: false,
  peersCount: 0
})

chrome.storage.sync.get(Object.keys(defaultValues), (result) => {
  const next = {
    ...defaultValues,
    ...result
  }

  chrome.storage.sync.set(next)
})
