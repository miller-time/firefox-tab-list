function getTabsByWindow(tabs) {
  let windowTabMap = {};
  for (let tab of tabs) {
    if (!windowTabMap[tab.windowId]) {
      windowTabMap[tab.windowId] = [];
    }
    windowTabMap[tab.windowId][tab.index] = {
      title: tab.title,
      url: tab.url
    };
  }

  let tabsByWindow = [];

  let windowIds = Object.keys(windowTabMap);
  windowIds.sort();

  for (let windowId of windowIds) {
    tabsByWindow.push({
      windowId: windowId,
      tabs: windowTabMap[windowId]
    });
  }

  return tabsByWindow;
}

function createTabEl(tab) {
  let contentEl = document.getElementById("content");

  let tabEl = document.createElement("p");

  let titleEl = document.createElement("span");
  titleEl.className = "title";
  titleEl.textContent = tab.title;

  let urlEl = document.createElement("span");
  urlEl.className = "url";
  urlEl.textContent = tab.url;

  tabEl.appendChild(titleEl);
  tabEl.appendChild(document.createElement("br"));
  tabEl.appendChild(urlEl);

  contentEl.appendChild(tabEl);
}

function createDividerEl() {
  let contentEl = document.getElementById("content");
  contentEl.appendChild(document.createElement("hr"));
}

function renderTabList(tabs) {
  let tabsByWindow = getTabsByWindow(tabs);
  let lastWindowId = tabsByWindow[tabsByWindow.length - 1].windowId;
  for (let tabWindow of tabsByWindow) {
    for (let tab of tabWindow.tabs) {
      createTabEl(tab);
    }
    if (tabWindow.windowId !== lastWindowId) {
      createDividerEl();
    }
  }
}

function handleError(err) {
  console.error(err);
}

browser.tabs.query({}).then(
  renderTabList,
  handleError
);
