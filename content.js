document.addEventListener("keydown", (event) => {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const ctrlOrMeta = isMac ? event.metaKey : event.ctrlKey; // Use ⌘ on Mac, Ctrl otherwise

  if (ctrlOrMeta && event.code === "ArrowRight") {
    chrome.runtime.sendMessage({ command: "scroll-tabs-right" });
  } else if (ctrlOrMeta && event.code === "ArrowLeft") {
    chrome.runtime.sendMessage({ command: "scroll-tabs-left" });
  } else if (ctrlOrMeta && event.shiftKey && event.code === "ArrowRight") {
    chrome.runtime.sendMessage({ command: "switch-windows-right" });
  } else if (ctrlOrMeta && event.shiftKey && event.code === "ArrowLeft") {
    chrome.runtime.sendMessage({ command: "switch-windows-left" });
  }
});
