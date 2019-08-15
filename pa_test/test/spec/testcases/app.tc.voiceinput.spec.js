import Results from '../../pageobjects/Results.page';
import Mic from '../../comobjects/Mic.com';


module.exports = (text, image_name, wav_file, duration, start_delay, end_delay, keyword, add_start_delay, reset) => {
  describe('Voice input test at Main Page', () => {
    it('should able to speak ' + text + ' and go to Result Page', () => {
      // add the start_delay for drill down question (QA-27)
      start_delay += add_start_delay; 
      Mic.holdToTalk(text, wav_file, duration, start_delay, end_delay);
      let interval = 100000;
      switch(keyword) {
        case 'hyd':
          browser.waitUntil(() => {
            return Results.hyd.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'es':
          browser.waitUntil(() => {
            return Results.es.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'cat':
          browser.waitUntil(() => {
            return Results.cat.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'komatsu':
          browser.waitUntil(() => {
            return Results.komatsu.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'basf':
          browser.waitUntil(() => {
            return Results.basf.waitForVisible(); 
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'john deere':
          browser.waitUntil(() => {
            return Results.john_deere.waitForVisible(); 
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'microsoft':
          browser.waitUntil(() => {
            return Results.microsoft.waitForVisible(); 
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'pg':
          browser.waitUntil(() => {
            return Results.pg.waitForVisible(); 
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'this month':
          browser.waitUntil(() => {
            return Results.this_mth.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'last month':
          browser.waitUntil(() => {
            return Results.last_mth.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'group':
          browser.waitUntil(() => {
            return Results.group.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'sales':
          browser.waitUntil(() => {
            return Results.sales.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'shipments':
          browser.waitUntil(() => {
            return Results.shipments.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        case 'top customers':
          browser.waitUntil(() => {
            return Results.top_cust.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
        default:
          browser.waitUntil(() => {
            return Results.topmessage.waitForVisible();
          }, interval, 'ERR: Result page take too long to show up');
          break;
      }

      expect(browser.compareScreen(image_name, {},).misMatchPercentage).to.equal(0);
    });

    it('should able to go back to Main Page', () => {
      (reset == 'yes') && 
        Results.go_home();
    });
  });
}
