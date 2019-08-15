import Com from './Com';
import { playAudio } from '../helpers/voiceHelper';

const SELECTORS = {
    MIC: '~mic',
};

class Mic extends Com {
      
    /* 
    ** Define elements
    */
    get mic()  { return $(SELECTORS.MIC); }
    
    /*
    ** Define or override Page methods
    */
    open() {
        super.open('mic');
    }

    holdToTalk(text, wavfile, duration, start_delay, end_delay) {
        if (this.mic.waitForVisible()) {
          const mic_x = browser.getLocation('~mic', 'x');
          const mic_y = browser.getLocation('~mic', 'y');
          browser.touchAction('~mic', [
              'longPress',
              { action: 'moveTo', x: mic_x, y: mic_y},
              { action: 'wait', ms: duration},
              { action: 'moveTo', x: mic_x + 1, y: mic_y + 1},
              { action: 'release'}
              ], playAudio(text, wavfile, start_delay, end_delay));
        }
      }
}

export default new Mic();

