import Page from '../../pageobjects/Page';

module.exports = () => {
 describe('Launch App', () => {
    it('should launch the app',  () => {
        browser.launch();
    });
 });
};
