import { XMovingObject } from '../helpers/x.moving.canvas';

export class CheckpointObject extends XMovingObject {
  public width = 30;
  public height = 130;
  public img = new Image();
  public hasPassed: boolean;

  constructor(params){
    super(params);
    this.img.src = '../../assets/images/props/checkpoint.png';
    this.hasPassed = false;
  }
}
