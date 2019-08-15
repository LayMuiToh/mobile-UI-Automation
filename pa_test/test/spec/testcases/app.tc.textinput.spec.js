import Results from '../../pageobjects/Results.page';
import { textEntry } from '../../helpers/textHelper';

module.exports = (text, result) => {
 describe('Text Input at Main Page', () => {
      it('should able to enter ' + text + 'and go to Results Page', () => {
        textEntry(text); 
        Results.topmessage.waitForVisible() &&
        expect(browser.compareScreen(result, {},).misMatchPercentage).to.equal(0);
        Results.go_home();
      });
  });
};
