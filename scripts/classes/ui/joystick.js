class Joystick {
  constructor(x = 0, y = 0) {
    this.id = ID(3);
    this.entity = new ClassicEntity().send();
    this.entity.z = ws.ZINDEX_UI + ws.ZINDEX_ORDER;
    this.x = x;
    this.y = y;
    this.radius = 100;
    this.joyX = 0;
    this.joyY = 0;
    this.joyRadius = 30;
    this.joyPositionX = this.x
    this.joyPositionY = this.y
    this.joy = new ClassicEntity().send();
    this.joy.z = ws.ZINDEX_UI + ws.ZINDEX_ORDER;
    this.angle = 0;
    this.angleRadi = 0;
    this.distanceJoy = 0;
    this.isTS = false;
    this.dataTS = { x: 0, y: 0 }
    var self = this;

    this._eventEmitter = new EventEmitter()

    this.entity.render = function() {
      ctx.beginPath();
      ctx.arc(self.x, self.y, self.radius, 0, Math.PI * 3);
      ctx.strokeStyle = '#ffffff90';
      ctx.fillStyle = '#eeeeee20';
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    this.joy.render = function() {
      ctx.beginPath();
      ctx.arc(self.joyPositionX, self.joyPositionY, self.joyRadius, 0, Math.PI * 3);
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#eeeeee';
      ctx.lineWidth = 0;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#111'
      ctx.stroke();
      ctx.fill();
      ctx.fillStyle = 'red';
      ctx.closePath();
    }

    emitter.on('ts', function(e) {
      var evt = {
        x: e.x,
        y: e.y
      }
      if (app.use.isPointInsideBBox({
          x: (self.x - self.radius),
          y: (self.y - self.radius),
          width: self.radius * 2,
          height: self.radius * 2
        }, evt)) {

        self.isTS = true;
        self.dataTS = evt;
        self._eventEmitter.emit('update', self)
      }
    })

    emitter.on('tm', function(e) {
      var evt = {
        x: e.x,
        y: e.y
      }

      var bbox = {
        x: (self.x - self.radius),
        y: (self.y - self.radius),
        width: self.radius * 2,
        height: self.radius * 2
      }

      if (self.isTS) {
        self.joyPositionX = evt.x;
        self.joyPositionY = evt.y;
        self.angleRadi = Math.atan2((evt.y - self.dataTS.y), (evt.x - self.dataTS.x));
        self.distanceJoy = (self.x - evt.x) * (self.x - evt.x) + (self.y - evt.y) * (self.y - evt.y)
        self.joyX = self.joyPositionX - self.x;
        self.joyY = self.joyPositionY - self.y;

        self.angle = ((-self.angleRadi + 2 * Math.PI) % (1 * Math.PI) * 100);
        self._eventEmitter.emit('update', self)

        if (!app.use.circleIntersect(self.x, self.y, self.radius, evt.x, evt.y, self.joyRadius / 3)) {
          self.joyPositionX = self.x + (Math.cos(self.angleRadi) * self.radius);
          self.joyPositionY = self.y + (Math.sin(self.angleRadi) * self.radius);
        }
      }
    })

    emitter.on('te', function(e) {
      self.joyPositionX = self.x;
      self.joyPositionY = self.y;
      self.isTS = false;
      self.distanceJoy = 0;
      self.dataTS = { x: 0, y: 0 };
      self.joyX = self.joyY = 0;
      self._eventEmitter.emit('update', self)
    })
  }
}
