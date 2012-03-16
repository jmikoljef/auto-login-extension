if(document.getElementById("ident"))
setTimeout(function() {
  chrome.extension.sendRequest({method: "getCredential"}, execute);
}, 3000);

