import Login from '../../pageobjects/Login.page';
import Main  from '../../pageobjects/Main.page';

module.exports = (row, xlLogin) => {
 describe('Login test', () => {
  before(() =>  {
   // browser.shake();
  //  $('~Debug JS Remotely').waitForExist() &&
  //  $('~Debug JS Remotely').click();
    Login.open();
  });
  
  it('should login with a correct credential',  () => {
    Login.selectServer(xlLogin[row].server);
    Login.login(xlLogin[row].emailID, xlLogin[row].password);
    
    browser.waitUntil(() => {
      return Main.go.waitForExist();
  }, 100000, 'ERR: Main page take too long to show up');
  });
});
};
