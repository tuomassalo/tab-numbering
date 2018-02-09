const browser = window.browser || window.chrome

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
      browser.tabs.executeScript(
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
  browser.tabs.query({}, function(tabs) {
    tabs.forEach(update)
  })
}

browser.tabs.onMoved.addListener(updateAll)
browser.tabs.onRemoved.addListener(updateAll)
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  update(tab)
})

updateAll()
