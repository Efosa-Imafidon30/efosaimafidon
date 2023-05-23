module.exports = class Page {
  open(path) {
    return browser.url(`https://dashboard.nexudus.com/${path}`);
  }
};
