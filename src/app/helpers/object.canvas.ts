export abstract class CanvasObject {
  public ctx: any;
  public width: number;
  public height: number;
  public x: number;
  public y: number;
  public color: string;

  constructor(ctx, width, height, x, y, color){
    this.ctx = ctx;
    this.color = color;
    this.x =  x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  public draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
