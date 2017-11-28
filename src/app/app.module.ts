import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LevelComponent } from './level/level.component';
import { GameComponent } from './game/game.component';
import { RestartComponent } from './restart/restart.component';
import { Controls } from './helpers/controls.canvas';


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
    path: 'game',
    component: GameComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LevelComponent,
    GameComponent,
    RestartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      Routes,
    )
  ],
  providers: [Controls],
  bootstrap: [AppComponent]
})
export class AppModule { }
