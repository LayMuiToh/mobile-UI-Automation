import Main from '../pageobjects/Main.page';

export function textEntry(text)
{
    text = text + ' ';
    Main.textinput.waitForVisible() &&
      Main.textinput.setValue(text);
    
    if(browser.isKeyboardShown()){
      browser.hideDeviceKeyboard();
    } else {
      Main.go.waitForVisible() &&
      Main.go.click();
    }
}

export function clearEntry()
{
  Main.textinput.waitForVisible() &&
  browser.clearElement('~textinput');
  browser.isKeyboardShown() &&
  browser.hideDeviceKeyboard();
}

export function closeMessagePage()
{
  if (Message.close.waitForVisible()) {
    const close_x = browser.getLocation('~close', 'x');
    const close_y = browser.getLocation('~close', 'y');
    browser.execute('mobile: tap', {x: close_x, y: close_y})
  }
}

export function mapPickerWheelValue(option)
{
  switch(option)
  {
    case 'Year to date':
    case 'All':
    case 'Business Segment':
    case 'None':
    default:
      return 0;
  }
}
