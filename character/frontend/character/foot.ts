namespace EIA2_W19 {
  export class Foot extends Drawable {
    constructor(
      private ctx: CanvasRenderingContext2D,
      protected position: Vector = new Vector(ctx.canvas.width / 2, ctx.canvas.height * 0.6),
      private data: FootData = {
        width: 25,
        height: 50,
        color: Color.BLACK
      }
    ) {
      super()
    }
    draw() {
      this.ctx.fillStyle = Color.BLACK
      this.ctx.beginPath()

      this.ctx.arc(this.position.x, this.position.y, this.data.width, 1 * Math.PI, 0 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
      this.ctx.save()
    }

    getData(): FootData {
      return this.data
    }

    set(footData: FootData): void {
      this.data = Object.assign(this.data, footData)
    }
  }

  export interface FootData {
    width: number
    height: number
    color: Color
  }
}
