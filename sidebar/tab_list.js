function getTabsByWindow(tabs) {
  let windowTabMap = {};
  for (let tab of tabs) {
    if (!windowTabMap[tab.windowId]) {
      windowTabMap[tab.windowId] = [];
    }
    windowTabMap[tab.windowId][tab.index] = tab;
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

  let tabEl = document.createElement("div");
  tabEl.className = "tab-item";
  tabEl.addEventListener("click", () => {
    browser.windows.update(tab.windowId, { focused: true });
    browser.tabs.update(tab.id, { active: true });
  });

  let titleContainerEl = document.createElement("div");
  titleContainerEl.className = "title-container";

  if (tab.favIconUrl) {
    let iconEl = document.createElement("img");
    iconEl.className = "icon";
    iconEl.height = 16;
    iconEl.width = 16;
    iconEl.src = tab.favIconUrl;
    titleContainerEl.appendChild(iconEl);
  }

  let titleEl = document.createElement("span");
  titleEl.className = "title";
  titleEl.textContent = tab.title;
  titleContainerEl.appendChild(titleEl);

  tabEl.appendChild(titleContainerEl);

  let urlEl = document.createElement("span");
  urlEl.className = "url";
  urlEl.textContent = tab.url;
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
