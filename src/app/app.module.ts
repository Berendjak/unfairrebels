import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LevelComponent } from './level/level.component';
import { GameComponent } from './game/game.component';
import { RestartComponent } from './restart/restart.component';
import { Controls } from './helpers/controls.canvas';
import { SoundService } from './services/sound.service';
import { FinishComponent } from './finish/finish.component';


// The Routes are going in here!
const Routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'level',
    component: LevelComponent
  },
  {
    path: 'game/:checkpoint',
    component: GameComponent
  },
  {
    path: 'restart/:checkpoint',
    component: RestartComponent
  },
  {
    path: 'finish',
    component: FinishComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LevelComponent,
    GameComponent,
    RestartComponent,
    FinishComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      Routes,
    )
  ],
  providers: [Controls, SoundService],
  bootstrap: [AppComponent]
})
export class AppModule { }
