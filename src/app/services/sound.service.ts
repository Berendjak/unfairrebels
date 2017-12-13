import { Injectable } from '@angular/core';

@Injectable()
export class SoundService {
  constructor() { }

  // soundBack
  public audioBack = new Audio();
  public buttonStatus = 'MUTE';
  public toggle = true;

  public audioChar = new Audio();

  // Function for toggling the sound
  public soundBack(url) {
    this.toggle = !this.toggle;
    this.buttonStatus = this.toggle ? 'MUTE' : 'SOUND';

    if (this.toggle) {
      this.audioBack.src = url;
      this.audioBack.load();
      this.audioBack.play();
    } else {
      this.audioBack.src = '';
    }
  }
  public soundChar(url) {
    this.audioChar.src = url;
    this.audioChar.load();
    this.audioChar.play();
  }
}
