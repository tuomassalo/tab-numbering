/*
 * Title:             tab-numbering.js
 * Description:       Numbers your tabs!
 * Created by:        Tuomas Salo
 * Contributions by:  Austin Moore
 */

'use strict';

const browser = window.browser || window.chrome;

/*
 * Function:     update
 * Description:  Updates a tab to have the desired tab number
 * Parameters:   tab (tabs.Tab)
 *                 - The current tab
 * Returns:      void
 */
const update = tab => {
  const oldTitle = tab.title;
  let newTitle = oldTitle;

  if (!newTitle)
    return;

  const numbers = ['¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸'];

  // Take out one of these numbers if it already exists in the title
  if (numbers.includes(newTitle[0]))
    newTitle = newTitle.substring(1);

  if (tab.index < 8)
    newTitle = numbers[tab.index] + newTitle;

  if (oldTitle !== newTitle) {
    try {
      browser.tabs.executeScript(
        tab.id,
        {
          code: `document.title = ${JSON.stringify(newTitle)};`
        }
      );
      console.log(`Executed: ${tab.id}`);
    } catch(e) {
      console.log('Tab numbering error:', e);
    }
  }
};

/*
 * Function:     updateAll
 * Description:  Updates all tabs to have the desired tab numbers
 * Parameters:   void
 * Returns:      void
 */
const updateAll = () => {
  browser.tabs.query({}, tabs => {
    tabs.forEach(update);
  });
};

// Must listen for opening anchors in new tabs
browser.tabs.onCreated.addListener(updateAll);

// Must listen for tabs being attached from other windows
browser.tabs.onAttached.addListener(updateAll);

browser.tabs.onMoved.addListener(updateAll);

// Firefox seems to do this inconsistently, thus this setTimeout kludge
browser.tabs.onRemoved.addListener(() => {
  updateAll();
  setTimeout(updateAll, 100);
  setTimeout(updateAll, 500);
  setTimeout(updateAll, 1000);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  update(tab);
});

updateAll();
