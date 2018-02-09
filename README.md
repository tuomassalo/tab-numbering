# tab-numbering
A browser extension for add numbering to tab titles. Uses WebExtensions API, and thus works on at least Chrome and Firefox.

![Screenshot](./screenshot.png)

This extension writes the tab number to the first eight tabs, the ones accessible with <kbd>ctrl</kbd>/<kbd>cmd</kbd> + *number*.

## How to install

- For Firefox: install from <a href="https://addons.mozilla.org/en-GB/firefox/addon/tab-numbering/">Mozilla Add-Ons</a>.
- For Chrome:
  1. Clone this repository to your machine
  2. Open <a href="chrome://extensions/">chrome://extensions/</a>
  3. Check **Developer mode**
  4. Click **Load unpacked extension...**
  5. Select the directory you cloned the repository into.

## Known issues

- does not add numbers to pinned tabs, internal error pages, "new tab" pages or other special tabs

- does not keep in sync when dragging tabs to/from another window

- will mess up with titles already starting with the characters `¹`...`⁸`
