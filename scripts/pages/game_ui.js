var joy = new Joystick(110, innerHeight - 110);
joy.radius = app.height / 12;
joy.joyRadius = joy.radius / 2.5;

var fireBtn = new TButton('FIRE', innerWidth - 140, innerHeight - 230, 50);
fireBtn.filter = 'brightness(110%)';

var boostBtn = new TButton('BOOST', innerWidth - 100, innerHeight - 105, 35);

var pickUBtn = new TButton('P/U', innerWidth - 180, innerHeight - 115, 30);

const room = {
  name: '#SYD46E7U',
  logs: [{
    msg: 'game started!',
    color: ws.COLOR_WHITE,
    font: 'gamefont',
    duration: 25,
  }],
  entity: new ClassicEntity().send(),
  log(msg) {
    var self = this;
    self.logs.push(msg);
  }
}

room.entity.render = function() {
  for (var i = 0; i < 3; i++) {
    var data = room.logs[i];
    if (data) {
      ctx.font = '15px ' + data.font;
      if (!data.time) data.time = 0;
      data.time += 1;
      ctx.fillStyle = data.color;
      var w = ctx.measureText(data.msg).width
      ctx.fillText(data.msg, (innerWidth / 2) - (w / 2), 25 + (i * 17));

      if (data.time >= data.duration) {
        room.logs.splice(i, 1);
      }
    }
  }
}

room.log({
  msg: '15 Players Joined',
  font: 'gamefont',
  color: ws.COLOR_BLUE,
  duration: 30
})


room.entity.z = ws.ZINDEX_UI + ws.ZINDEX_ORDER;

var roomSecondRender = new ClassicEntity().send();
roomSecondRender.render = function() {
  ctx.font = '18px gamefont';
  ctx.fillStyle = ws.COLOR_YELLOW;
  var w = ctx.measureText(room.name).width;
  ctx.fillText(room.name, (innerWidth - w - 16), 18);
}
roomSecondRender.z = ws.ZINDEX_ORDER + ws.ZINDEX_UI