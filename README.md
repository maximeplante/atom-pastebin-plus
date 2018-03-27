# Atom Pastebin Plus

Upload a file (or a part of it) to Pastebin in one keystroke.

This project is greatly inspired from [atom-pastebin](https://atom.io/packages/atom-pastebin). Since the original author does not seem to be active anymore, this project is a rewrite of this extension with a few differences and new features.

## How To
1. Open a file.
2. Make a selection (optional).
3. Press `alt-ctrl-P` or `right-click > Upload to Pastebin`.

Note: if no selection is made, the complete file will be uploaded to Pastebin.

## Features
* Upload a file or a selection in a single keystroke.
* Paste visibility can be changed in the settings.
* Paste expiration delay can be changed in the settings.
* Copy link to clipboard.
* Open in browser.
### Improvements over atom-pastebin
* Ability to upload a selection instead of the whole file.
* Minimal footprint on Atom startup time (~5ms vs ~100ms).
* Better error handling.
* No need to provide a developer key.
