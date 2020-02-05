namespace EIA2_W19 {
  export class Arm extends Drawable {
    constructor(
      private ctx: CanvasRenderingContext2D,
      private orientation: string = 'left',
      protected position: Vector = new Vector(ctx.canvas.width / 2, ctx.canvas.height * 0.6),
      public generalHeight: number = 5,
      private data: ArmData = {
        width: 30,
        height: 20,
        color: Color.BLACK
      }
    ) {
      super()
    }

    draw() {
      // TODO: Refactor
      // TODO: Buggy width parameter
      this.ctx.fillStyle = this.data.color
      this.ctx.beginPath()
      if (this.orientation === 'left') {
        this.ctx.moveTo(this.position.x, this.position.y)
        this.ctx.lineTo(this.position.x - 30 - this.data.width, this.position.y + this.getCalculatedHeight())
        this.ctx.lineTo(this.position.x - 30, this.position.y + this.getCalculatedHeight())
        this.ctx.lineTo(this.position.x, this.position.y + 15 + this.data.width)
        this.ctx.lineTo(this.position.x, this.position.y)
      } else {
        this.ctx.moveTo(this.position.x, this.position.y)
        this.ctx.lineTo(this.position.x + 30 + this.data.width, this.position.y + this.getCalculatedHeight())
        this.ctx.lineTo(this.position.x + 30, this.position.y + this.getCalculatedHeight())
        this.ctx.lineTo(this.position.x, this.position.y + 15 + this.data.width)
        this.ctx.lineTo(this.position.x, this.position.y)
      }
      this.ctx.closePath()
      this.ctx.fill()
    }

    public getCalculatedHeight(): number {
      return this.data.height * (this.generalHeight ? this.generalHeight : 5 / 10)
    }

    public getData() {
      return this.data
    }

    public set(armData: ArmData) {
      this.data = Object.assign(this.data, armData)
    }
  }

  export interface ArmData {
    width: number
    height: number
    color: Color
  }
}
