browser.tabs.query({}).then(
  function(tabs) {
    for (let tab of tabs) {
      let tabEl = document.createElement("p");

      let titleEl = document.createElement("span");
      titleEl.innerText = tab.title;
      let urlEl = document.createElement("span");
      urlEl.innerText = tab.url;

      tabEl.appendChild(titleEl);
      tabEl.appendChild(document.createElement("br"));
      tabEl.appendChild(urlEl);

      document.getElementById("content").appendChild(tabEl);
    }
  },
  function(err) {
    console.error(err);
  });
