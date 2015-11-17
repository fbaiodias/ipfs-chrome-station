ipfs-chrome-station
===

Chrome extension that let's have a look at your IPFS node stats

Based on [IPFS station](https://github.com/ipfs/station/) and [react-chrome-extension-boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate)

![demo](https://raw.githubusercontent.com/xicombd/ipfs-chrome-station/master/demo.gif)


## Installation

```bash
# git clone ...

npm install
```

## Development

* Run script
```bash
# build files to './dev'
# start webpack dev server
npm run dev
```
* Go to [chrome://extensions/](chrome://extensions/) and check `Developer Mode` box
* Click `Load unpacked extension...` and select the `dev` folder

## Build

```bash
# build files to './build'
npm run build
```

## Build & Compress ZIP file

```bash
# compress build folder to archive.zip
npm run compress
```

## LICENSE

[MIT](LICENSE)
