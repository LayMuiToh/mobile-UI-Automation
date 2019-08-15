import Page from './Page';

const SELECTORS = {
    EMAIL: '~email',
    PASSWORD: '~password',
    SIGNIN: '~signin',
    SG: '~SG',
    US: '~US', 
   
};

class Login extends Page {

    /* 
    ** Define elements
    */
    get username()  { return $(SELECTORS.EMAIL); }
    get password()  { return $(SELECTORS.PASSWORD); }
    get signin()    { return $(SELECTORS.SIGNIN); }
    get sg()    { return $(SELECTORS.SG); }
    get us()    { return $(SELECTORS.US); }
 
    open() {
        super.open('login');
    }

    clearLogin()
    {
        browser.clearElement('~email'); 
        browser.clearElement('~password');
    }

    login (user, pass) {
        if (this.isLoggedIn()) {
            this.clearLogin();
            this.username.setValue(user);
            this.password.setValue(pass);
        }
        browser.isKeyboardShown() &&
        browser.hideDeviceKeyboard();
      
        this.signin.waitForVisible() &&
        this.signin.click();
    }

    selectServer(server)
    {
        switch(server) {
            case 'SG':
                this.sg.waitForVisible() &&
                this.sg.click();
                break;
            case 'US':
                this.us.waitForVisible() &&
                this.us.click();
                break;
        }
    }

    isLoggedIn() {
        return this.username.waitForVisible() && this.password.waitForVisible();
    }
}

export default new Login();


