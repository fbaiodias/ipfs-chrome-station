ipfs-chrome-station
===

Chrome extension that let's you access [IPFS](https://ipfs.io) urls seamlessly from your local [IPFS node](https://ipfs.io/docs/install/), and take a look at its stats.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![Available in the Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/ipfs-station/kckhgoigikkadogfdiojcblegfhdnjei)

Based on [react-chrome-extension-boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate), [ipfs-station](https://github.com/ipfs/station/) and [ipfs-firefox-addon](https://github.com/lidel/ipfs-firefox-addon) *(if you're using Firefox, make sure to check it out)*.

### Demo

![demo](https://raw.githubusercontent.com/xicombd/ipfs-chrome-station/master/demo.gif)

### Features

- Icon with badge that shows if the node is running, and how many peers are connected to it
- Clicking on the icon opens popup menu with useful operations:
  - See stats of the IPFS node
  - Toggle redirection to the IPFS node
  - Open IPFS node WebUI
  - Open extension options (more about this bellow)
  - Additionally, on pages loaded from IPFS:
    - Copy canonical IPFS address
    - Copy shareable URL to resource at a default public gateway (https://ipfs.io)
    - Pin/unpin IPFS Resource
- When redirection is on, requests to `https?://*/(ipfs|ipns)/$RESOURCE` are replaced with `http://localhost:8080/(ipfs|ipns)/$RESOURCE`
- Options menu that let's you customize several parameters:
  - IPFS node host
  - IPFS node port
  - IPFS node API port
  - API stats polling interval
  - Toggle redirection

### Installation

```bash
# git clone ...

npm install
```

### Development

* Run script
```bash
# build files to './dev'
# start webpack dev server
npm run dev
```
* Go to [chrome://extensions/](chrome://extensions/) and check `Developer Mode` box
* Click `Load unpacked extension...` and select the `dev` folder

### Build

```bash
# build files to './build'
npm run build
```

### Build & Compress ZIP file

```bash
# compress build folder to archive.zip
npm run compress
```

### LICENSE

[MIT](LICENSE)
