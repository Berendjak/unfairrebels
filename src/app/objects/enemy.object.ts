import { ShootingCanvas } from '../helpers/shooting.canvas';

export class EnemyObject extends ShootingCanvas {
  public img = new Image();

  constructor(params) {
    super(params);
    this.img.src = '../../assets/images/props/at-st.png';
    this.width = 100;
    this.height = 150;
    this.bulletY = this.y + 39;
  }
}
