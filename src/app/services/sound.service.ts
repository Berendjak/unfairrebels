import { Injectable } from '@angular/core';

@Injectable()
export class SoundService {
  constructor() { }

  // Sound
  public audio = new Audio();
  public buttonStatus = 'MUTE';
  public toggle = true;

  // Function for toggling the sound
  public Sound() {
    this.toggle = !this.toggle;
    this.buttonStatus = this.toggle ? 'MUTE' : 'SOUND';

    if (this.toggle) {
      this.audio.src = '../assets/sounds/theme.mp3';
      this.audio.load();
      this.audio.play();
    } else {
      this.audio.src = '';
    }
  }
}
