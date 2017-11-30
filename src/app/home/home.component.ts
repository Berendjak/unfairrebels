import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SoundService } from '../services/sound.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(private sound: SoundService) {}

  ngOnInit() {

  }
}
