document.addEventListener("DOMContentLoaded", function () {
    var permissionListTextarea = document.getElementById("permissionList");
    var saveButton = document.getElementById("saveButton");
  
    // Recupera le permissions correnti dallo storage locale
    chrome.storage.local.get("permissions", function (result) {
      var permissions = result.permissions || [];
      permissionListTextarea.value = JSON.stringify(permissions, null, 2);
    });
  
    // Salva le permissions nello storage locale quando il pulsante "Save" viene premuto
    saveButton.addEventListener("click", function () {
      var permissions = permissionListTextarea.value;
      try {
        permissions = JSON.parse(permissions);
        chrome.storage.local.set({ permissions: permissions }, function () {
          alert("Permissions saved successfully.");
        });
      } catch (error) {
        alert("Invalid JSON format. Please enter a valid JSON array.");
      }
    });
  });
  