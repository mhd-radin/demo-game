class IButton {
  constructor(img, x = 0, y = 0, w = 50, h = 50) {
    this.img = img;
    this.btn_entity = new ClassicEntity().send();
    this.x = x;
    this.y = y;
    this.w = w;
    this.img_entity = new ClassicEntity().send();
    this.h = h;
    this.filter = '';
    this.rotate = 0;
    this.r = 40;
    this.scale = 1;
    this.emitter = new EventEmitter();
    var self = this;

    this.btn_entity.render = function() {
      ctx.beginPath();
      ctx.scale(self.scale, self.scale);
      ctx.arc(self.x + (self.w / 2), self.y + (self.h / 2), self.r, 0, Math.PI * 2)
      ctx.strokeStyle = '#eee'
      ctx.lineWidth = 4;
      ctx.fillStyle = '#ffffff50';
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    this.img_entity.render = function() {
      ctx.filter = self.filter;
      ctx.translate(self.x + (self.w / 2), self.y + (self.h / 2))
      ctx.scale(self.scale, self.scale);
      ctx.rotate(self.rotate)
      ctx.drawImage(self.img,
        0, 0, self.img.width, self.img.height,
        (-self.w / 2), (-self.h / 2), self.w, self.h);
    }

    emitter.on('ts', function(e) {
      if (app.use.isPointInsideBBox({
          x: self.x,
          y: self.y,
          width: self.w,
          height: self.h
        }, e)) {
        self.emitter.emit('click', e)
      }
    });
  }

  on(type, handle) {
    var self = this;
    this.emitter.on(type, handle)
  }

  off(type, handle) {
    this.emitter.off(type, handle)
  }
}

class TButton {
  constructor(text, x = 0, y = 0, r = 50) {
    this.text = text;
    this.btn_entity = new ClassicEntity().send();
    this.x = x;
    this.y = y;
    this.text_entity = new ClassicEntity().send();
    this.filter = '';
    this.rotate = 0;
    this.r = r;
    this.fontSize = (r / 2);
    this.scale = 1;
    this.emitter = new EventEmitter();
    var self = this;

    this.btn_entity.render = function() {
      ctx.beginPath();
      ctx.scale(self.scale, self.scale);
      ctx.arc(self.x + (self.r), self.y + (self.r), self.r, 0, Math.PI * 2)
      ctx.strokeStyle = '#eee'
      ctx.lineWidth = 4;
      ctx.fillStyle = '#ffffff50';
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    this.text_entity.render = function() {
      ctx.font = (self.r / 2) + 'px gamefont';
      ctx.filter = self.filter;
      ctx.translate(self.x + (self.r + (ctx.measureText(self.text).width/4.5)), self.y + (self.r + (r / 1.5)))
      ctx.scale(self.scale, self.scale);
      ctx.rotate(self.rotate)
      ctx.fillStyle = '#fff';

      ctx.fillText(self.text, (-self.r / 2), (-self.r / 2))
    }

    emitter.on('ts', function(e) {
      if (app.use.isPointInsideBBox({
          x: self.x,
          y: self.y,
          width: self.r * 2,
          height: self.r * 2
        }, e)) {
        self.emitter.emit('click', e)
      }
    });
  }

  on(type, handle) {
    var self = this;
    this.emitter.on(type, handle)
  }

  off(type, handle) {
    this.emitter.off(type, handle)
  }
}

var img = new Image();


img.src = getVehicleAssetByName('skiber.idle').path
img.onload = () => {
  var ib = new TButton('CLICK IT', 50, 50, 80);
  ib.filter = 'brightness(110%)';
  var em = function(e) {
    app.log('EVENT ' + Math.random());
    ib.off('click', em)
  }
  ib.on('click', em);
}