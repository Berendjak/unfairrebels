import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RestartComponent implements OnInit {
  constructor( private activeRoute: ActivatedRoute,
               private router: Router ) {}

  public checkpoint: number;
  public level: number;

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.checkpoint = params.checkpoint
      this.level = params.level
    });
  }

  @HostListener('document:keydown', ['$event'])
  public keyDown(event: KeyboardEvent) {
    if (event.keyCode === 32 || event.which === 32) {
      this.router.navigate(['/game', this.level, this.checkpoint]);
    }
  }
}
