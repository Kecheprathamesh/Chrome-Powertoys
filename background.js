let currentTabIndex = 0;
let currentWindowId = null;

// Function to switch tabs
async function switchTab(direction) {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  if (tabs.length === 0) return;

  currentTabIndex = (currentTabIndex + direction + tabs.length) % tabs.length;
  const tab = tabs[currentTabIndex];
  await chrome.tabs.update(tab.id, { active: true });

  // Focus the window when switching tabs
  await chrome.windows.update(tab.windowId, { focused: true });
}

// Function to switch windows
async function switchWindow(direction) {
  const windows = await chrome.windows.getAll();
  const currentWindowIndex = windows.findIndex((win) => win.id === currentWindowId);
  const newWindowIndex = (currentWindowIndex + direction + windows.length) % windows.length;
  const newWindow = windows[newWindowIndex];
  currentWindowId = newWindow.id;
  await chrome.windows.update(newWindow.id, { focused: true });
}

// Handle key commands
chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "scroll-tabs-right":
      await switchTab(1);
      break;
    case "scroll-tabs-left":
      await switchTab(-1);
      break;
    case "switch-windows-right":
      await switchWindow(1);
      break;
    case "switch-windows-left":
      await switchWindow(-1);
      break;
  }
});

// Enable icon and make it clickable
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.enable(); // Ensures the icon is active
});

chrome.action.onClicked.addListener(async () => {
  await switchTab(1); // Click icon to move to next tab
});

// Initialize current window ID
chrome.windows.getCurrent({}, (win) => {
  if (win) {
    currentWindowId = win.id;
  }
});

// Handle window closure
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === currentWindowId) {
    currentWindowId = null;
  }
});
