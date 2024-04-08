class ImageCardOfTopRightBox {
  constructor(iconImage, subtext = 'null') {
    this.iconImage = iconImage;
    this.crop = {
      x: 0,
      y: 0,
      w: iconImage.width,
      h: iconImage.height
    }
    this.bg = '#4AA452';
    this.color = '#fff';
    this.bColor = ws.COLOR_GREEN
    this.subtext = subtext;
    this.x = 0, this.y = 0;
    this.entity = new ClassicEntity().send();

    var self = this;
    this.entity.render = function() {
      var path = new Path2D();
      path.roundRect(self.x, self.y, 40, 50, 5);

      ctx.fillStyle = self.bg;
      ctx.strokeStyle = self.bColor;
      ctx.lineWidth = 2;
      ctx.fill(path);
      ctx.stroke(path);

      ctx.drawImage(self.iconImage,
        self.crop.x, self.crop.y, self.crop.w, self.crop.h,
        self.x + 5, self.y + 5, 28, 28
      )

      ctx.fillStyle = '#fff';
      ctx.font = '12px gamefont';
      var tw = ctx.measureText(self.subtext).width
      ctx.fillText(self.subtext, ((self.x + 20) - (tw / 2)), self.y + 45)
    }

    entityLayerToUILayer(this.entity)
  }
}
