/**
 * 
 * @param {string} query 
 * @param {Element} base 
 * @returns {HTMLElement | null}
 */
export const query = (query, base = document) => base.querySelector(query);
/**
 * 
 * @param {string} query 
 * @param {Element} base 
 * @returns {NodeListOf<HTMLElement> | null}
 */
export const queryAll = (query, base = document) => base.querySelectorAll(query);
export const formatDate = (date) => new Date(date).toLocaleString();
export const getData = async (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (values) => {
      resolve(values[key]);
    });
  });
}
export const setData = async (key, value) => {
  chrome.storage.local.set({ [key]: value })
}
export const removeData = async (key) => {
  chrome.storage.local.remove(key)
}
export const getSavedTokenKey = (origin, accountId) => `${origin}savedToken${accountId}`;
export const getSavedFolderId = (origin, accountId) => `${origin}savedFolderId${accountId}`;
export const getHost = (origin) => origin.replace(/https?:\/+/gi, '');
export async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
export const getAccountId = (pathname) => {
  const [accountId] = pathname.match(/(?<=accounts\/)[0-9]+/gi) || [];

  return accountId;
}
export const isLocalhost = (origin) => /127|localhost/gi.test(origin);
export const getTabById = async (id) => {
  return await chrome.tabs.get(id);
}
