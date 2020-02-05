namespace EIA2_W19 {
  export class Body extends Drawable {
    constructor(
      private ctx: CanvasRenderingContext2D,
      protected position: Vector = new Vector(ctx.canvas.width / 2, ctx.canvas.height * 0.6),
      private data: BodyData = {
        color: Color.BLUE,
        width: 100,
        height: 30
      },
      public generalHeight: number = 5
    ) {
      super()
    }
    draw() {
      this.ctx.fillStyle = this.data.color
      this.ctx.beginPath()
      this.ctx.rect(this.position.x - this.data.width / 2, this.position.y, this.data.width, this.getCalculatedHeight())
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.restore()
      this.ctx.save()
    }

    public getCalculatedHeight(): number {
      return this.data.height * (this.generalHeight ? this.generalHeight : 5 / 10)
    }

    public getData(): BodyData {
      return this.data
    }

    public set(bodyData: BodyData) {
      this.data = Object.assign(this.data, bodyData)
    }
  }

  export interface BodyData {
    color: Color
    width: number
    height: number
  }
}
