chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "aemEnhancer",
    title: "AEM Enhancer",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "openInEditor",
    title: "Open Selection in Editor",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "openInProperties",
    title: "Open Selection in Properties",
    contexts: ["selection"],
  });

/*  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    type: "separator",
    title: "-----",
    contexts: ["selection"],
  });
*/
  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "openInAssets",
    title: "Open Selection in Assets",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "copyRealPath",
    title: "Copy Real Path",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "openInEditor") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + "/editor.html" + pathCopiata + ".html";

    chrome.tabs.create({ url: destinazione });
  }

  if (info.menuItemId === "openInProperties") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + "/mnt/overlay/wcm/core/content/sites/properties.html?item=" + pathCopiata;

    chrome.tabs.create({ url: destinazione });
  }

  if (info.menuItemId === "openInAssets") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + "/assets.html" + pathCopiata + ".html";

    chrome.tabs.create({ url: destinazione });
  }

  if (info.menuItemId === "copyRealPath") {
    chrome.tabs.executeScript(tab.id, {
      code: `
        var button = document.querySelector('.js-editor-PageInfo-closePopover');
        if (button) {
          var dataPath = button.getAttribute('data-path');
          var itemIndex = dataPath.indexOf('?item=');
          var value = itemIndex !== -1 ? dataPath.substring(itemIndex + 7) : dataPath;
          var tempInput = document.createElement('input');
          document.body.appendChild(tempInput);
          tempInput.value = "/" + value;
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          console.log('Il valore è stato copiato negli appunti: ' + value);
        }
      `,
    });
  }
});
