import { setData } from './scripts/js/utils/index.js';

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.tabs.create({ url: 'chrome-extension://majfibgeemjobijejfoecibealdlmpjc/popup.html', active: true });
  setData('currentTabId', tab.id);
});
