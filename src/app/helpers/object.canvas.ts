export interface CanvasObjectService {
  ctx: any;
  x: number;
  y: number;

  // Optional
  width?: number;
  height?: number;
  color?: string;
  img?: any;
  msg?: string;
}

export abstract class ObjectCanvas {
  public ctx: any;
  public x: number;
  public y: number;

  // Optional
  public width: number;
  public height: number;
  public color: string;
  public img: any;
  public msg: string;

  constructor(params: CanvasObjectService) {
    this.ctx = params.ctx;
    this.x =  params.x;
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;
    this.color = params.color;
    this.img = params.img;
    this.msg = params.msg;
  }

  public draw() {
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    if (this.color && !this.msg) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.img) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else if (this.msg) {
      this.ctx.shadowColor = this.color;
      this.ctx.shadowBlur = 3;
      this.ctx.font = '40px Arial';
      this.ctx.fillStyle = this.color;
      this.ctx.fillText(this.msg, this.x, this.y);
    }
  }
}
