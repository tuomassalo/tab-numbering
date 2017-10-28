var update = function(details) {
  var oldTitle = details.title
  var newTitle = oldTitle

  if(!newTitle) {
    return
  }

  var numbers = ['¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹']

  if (newTitle && numbers.includes(newTitle[0])) {
    newTitle = newTitle.substr(1)
  }

  if(details.index < 8) {
    newTitle = numbers[details.index] + newTitle
  }
  if(oldTitle !== newTitle) {
    try {
      chrome.tabs.executeScript(
        details.id,
        {
          code : `document.title = ${JSON.stringify(newTitle)}`
        }
      )
      console.log("executed: " + details.id)
    } catch(e) {
      console.log("Tab numbering error:", e)
    }
  }
}

function updateAll() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(update)
  })
}

chrome.tabs.onMoved.addListener(updateAll)
chrome.tabs.onRemoved.addListener(updateAll)
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  update(tab)
})

updateAll()
