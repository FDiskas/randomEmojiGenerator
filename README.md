# ![donation-128px](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MEYBUEDYFS5SG) random Emo Generator
A Chrome extension ads ability to rehost an image.

### Prefered way to use `yarn` vs npm [YARN](https://yarnpkg.com/en/docs/install)
1. First install dependencies
  ```npm install``` or ```yarn```
1. Build to dist. You should have Chrome or Chromium browser to build the *.crx extension
  ```npm run build```
  This will compile extension to dist

* To release new version type.
  ```npm release [version|major|minor|patch|premajor|preminor|prepatch|prerelease]```
   This will increase the version number off extention by edditing manifest.json

* For development after edits - recompile script
  ```npm run dev```
  This will copy all required files to dist/src. Then you should 
