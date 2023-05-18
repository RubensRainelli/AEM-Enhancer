chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "aemEnhancer",
    title: "AEM Enhancer",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "openSelectedInEditor",
    title: "Open Selection in Editor",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "openSelectedInProperties",
    title: "Open Selection in Properties",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "openSelectedInPreview",
    title: "Open Selection in Preview",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "openSelectedInSites",
    title: "Open Selection in Sites",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "openSelectedInAssets",
    title: "Open Selection in Assets",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "separator",
    type: "separator",
    title: "-----",
    contexts: ["selection"],
  });
  
  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "copyRealPath",
    title: "Copy Real Path",
    contexts: ["page"],
  });
/*
  chrome.contextMenus.create({
    parentId: "aemEnhancer",
    id: "realPathManagePubblication",
    title: "Manage Pubblication for Real Path of This Page",
    contexts: ["all"],
  });
*/
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "openSelectedInEditor") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + "/editor.html" + pathCopiata + ".html";

    chrome.tabs.create({ url: destinazione });
  }

  if (info.menuItemId === "openSelectedInProperties") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + "/mnt/overlay/wcm/core/content/sites/properties.html?item=" + pathCopiata;

    chrome.tabs.create({ url: destinazione });
  }

  if (info.menuItemId === "openSelectedInPreview") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + pathCopiata + ".html?wcmmode=disabled";

    chrome.tabs.create({ url: destinazione });
  }
/*
  if (info.menuItemId === "realPathManagePubblication") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + "/mnt/override/libs/wcm/core/content/common/managepublicationwizard.html?item=" + pathCopiata;

    chrome.tabs.create({ url: destinazione });
  }
*/
  if (info.menuItemId === "openSelectedInAssets") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + "/assets.html" + pathCopiata;

    chrome.tabs.create({ url: destinazione });
  }

  if (info.menuItemId === "openSelectedInSites") {
    var pathCopiata = info.selectionText;
    var url = new URL(tab.url);
    var destinazione = url.origin + "/sites.html" + pathCopiata;

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
// TODO: Fix this code
  if (info.menuItemId === "realPathManagePubblication") {
    chrome.tabs.executeScript(tab.id, {
      code: `
      var button = document.querySelector('.js-editor-PageInfo-closePopover');
      if (button) {
        var dataPath = button.getAttribute('data-path');
        var itemIndex = dataPath.indexOf('?item=');
        var value = itemIndex !== -1 ? dataPath.substring(itemIndex + 7) : dataPath;
        var tempInput = document.createElement('input');
        var url = new URL(tab.url);
      
        document.body.appendChild(tempInput);
        tempInput.value = "/mnt/override/libs/wcm/core/content/common/managepublicationwizard.html?item=/" + value;
        tempInput.select();
        var destinazione = url.origin + "/mnt/override/libs/wcm/core/content/common/managepublicationwizard.html?item=/" + tempInput;
        document.body.removeChild(tempInput);
        chrome.tabs.create({ url: destinazione });
      
      }      
      `,
    });
  }

});
