import Page from './Page';

const SELECTORS = {
    CLOSE: '~close',
    LOGOUT: '~Logout'
   
};

class Logout extends Page {

    /* 
    ** Define elements
    */
    get close()  { return $(SELECTORS.CLOSE); }
    get logout()  { return $(SELECTORS.LOGOUT); }

    open() {
        super.open('logout');
    }

}

export default new Logout();

