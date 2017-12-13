interface CanvasObjectService {
  ctx: any;
  x: number;
  y: number;
  width: number;
  height: number;

  // Optional
  color?: string;
  img?: any;
}

export abstract class CanvasObject {
  public ctx: any;
  public width: number;
  public height: number;
  public x: number;
  public y: number;

  // Optional
  public color: string;
  public img: any;

  constructor(params: CanvasObjectService) {
    this.ctx = params.ctx;
    this.x =  params.x;
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;
    this.color = params.color;
    this.img = params.img;
  }
  public draw() {
    if (this.color) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.img) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}
