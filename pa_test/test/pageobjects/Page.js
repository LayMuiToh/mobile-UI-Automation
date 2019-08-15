export default class Page {
    open(name) {
      browser.isLocked() &&
      browser.unlock();
    }
}
