if(document.getElementById("ident"))
setTimeout(function() {
  chrome.extension.sendRequest({method: "getCredential"}, process);
}, 3000);

