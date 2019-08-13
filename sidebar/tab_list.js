browser.tabs.query({}).then(
  function(tabs) {
    for (let tab of tabs) {
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

      document.getElementById("content").appendChild(tabEl);
    }
  },
  function(err) {
    console.error(err);
  });
