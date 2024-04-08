var joy = new Joystick(110, innerHeight - (110));
joy.radius = (innerHeight / 100) * 8;
joy.joyRadius = joy.radius / 2.5;

var fireBtn = new TButton('FIRE', innerWidth - 140, innerHeight - 230, 50);
fireBtn.filter = 'brightness(110%)';

var boostBtn = new TButton('BOOST', innerWidth - 100, innerHeight - 105, 35);

var pickUBtn = new TButton('P/U', innerWidth - 180, innerHeight - 115, 30);

const room = {
  time: 0,
  name: '#SYD46E7U',
  startedTime: app.time.pastSec,
  logs: [{
    msg: 'game started!',
    color: ws.COLOR_WHITE,
    font: 'gamefont',
    duration: 50,
  }],
  entity: new ClassicEntity().send(),
  log(msg) {
    var self = this;
    self.logs.push(msg);
  }
}

room.entity.render = function() {
  room.time += 1;
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
  duration: 70
})


room.entity.z = ws.ZINDEX_UI + ws.ZINDEX_ORDER;

var roomSecondRender = new ClassicEntity().send();
roomSecondRender.render = function() {
  // Convert seconds to time format 
  var sec = (app.time.nowSec - room.startedTime) / 1000;
  var minutes = Math.floor(sec / 60);
  var seconds = Math.floor(sec % 60);
  // Formatting the time with leading zeros if necessary 
  var strTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


  var text = room.name + ' ' + strTime;
  ctx.font = '18px gamefont';
  ctx.fillStyle = ws.COLOR_YELLOW;
  var w = ctx.measureText(text).width;
  ctx.fillText(text, (innerWidth - w - 16), 18);
}
roomSecondRender.z = ws.ZINDEX_ORDER + ws.ZINDEX_UI;

var chatButtonUi = new ClassicEntity().send();
var iconsPackImg = new Image();
iconsPackImg.src = '/assets/icons/UiIconsPack_Transparent_Icons.png';
iconsPackImg.onload = function() {

  chatButtonUi.render = function() {
    ctx.drawImage(iconsPackImg,
      2003, 1555, 310, 265,
      10, 10, 45, 45);
  }
}

var chatBtnBBox = {
  x: 10,
  y: 10,
  width: 40,
  height: 40
}

var powerUpsDisplay = new ClassicEntity().send();
powerUpsDisplay.render = function() {
  ctx.drawImage(iconsPackImg,
    360, 2090, 310, 310,
    10, 60, 30, 30);

  ctx.font = '16px gamefont';
  ctx.fillStyle = '#fff'
  ctx.fillText(app.time.calculatedFPS, 40, 80)
}

var pointsDisplay = new ClassicEntity().send();
var coinImg = new Image();
coinImg.src = '/assets/icons/robux.png';
pointsDisplay.render = function() {
  ctx.drawImage(iconsPackImg,
    310 * 2, 310 * 3, 310, 310,
    7, 85, 30, 30);
  ctx.drawImage(coinImg, 7, 90, 30, 30)

  ctx.font = '16px gamefont';
  ctx.fillStyle = ws.COLOR_GREEN;
  ctx.fillText('3', 40, 110)
}

var weaponDisplay = new ClassicEntity().send();
weaponDisplay.render = function() {
  var path = new Path2D();
  path.moveTo(20, 0);
  path.lineTo(140, 0);
  path.lineTo(150, 10);
  path.lineTo(150, 50);
  path.lineTo(10, 50);
  path.lineTo(0, 40);
  path.lineTo(0, 0);
  path.closePath();

  ctx.translate(5, 130)
  ctx.strokeStyle = ws.COLOR_BLUE;
  ctx.lineWidth = 2;
  ctx.stroke(path)
  ctx.fillStyle = ws.COLOR_BLUE + '30';
  ctx.fill(path)

  ctx.font = '23px gamefont'
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = ws.COLOR_BLUE
  ctx.fillText('LASER 2x', 20, 30);

  ctx.font = '12px gamefont';
  ctx.fillText('ammo 150/35', 20, 42)
}

var rightBox = new ClassicEntity().send();
rightBox.render = function() {
  var path = new Path2D();
  path.roundRect(innerWidth - 150, 30, 140, 60, 5);

  ctx.fillStyle = '#fff';
  ctx.strokeStyle = ws.COLOR_BLUE;
  ctx.lineWidth = 4;
  ctx.fill(path);
  ctx.stroke(path)
}

entityLayerToUILayer(rightBox)

var cloverImg = new Image();
cloverImg.src = '/assets/icons/clover.png'
var ic = new ImageCardOfTopRightBox(cloverImg, '2x')
ic.crop.w = ic.crop.h = 500;
ic.x = innerWidth - 145;
ic.y = 35;

var cloverImg = new Image();
cloverImg.src = '/assets/icons/rebirth.png'
var ic = new ImageCardOfTopRightBox(cloverImg, '1x')
ic.crop.w = ic.crop.h = 500;
ic.x = innerWidth - 100;
ic.y = 35

var cloverImg = new Image();
cloverImg.src = '/assets/icons/correct.png'
var ic = new ImageCardOfTopRightBox(cloverImg, '2x')
ic.crop.w = ic.crop.h = 500;
ic.x = innerWidth - 55;
ic.y = 35

var shoppingCartPng = new Image();
shoppingCartPng.src = '/assets/icons/shopping cart.png'
var upgradeBtn = new IButton(shoppingCartPng, innerWidth - 205, 45, 35, 35);
upgradeBtn.r = 25;
upgradeBtn.bg = '#4AA45280'
upgradeBtn.stroke = ws.COLOR_GREEN;
upgradeBtn.btn_entity.render = function() {
  var path = new Path2D();
  var self = upgradeBtn;
  path.moveTo(20, 0);
  path.lineTo(40, 0);
  path.lineTo(50, 10);
  path.lineTo(50, 50);
  path.lineTo(10, 50);
  path.lineTo(0, 40);
  path.lineTo(0, 0);
  path.closePath();

  ctx.translate(self.x - (self.w / 4), self.y - (self.h / 4))
  ctx.strokeStyle = self.stroke;
  ctx.lineWidth = 2;
  ctx.fillStyle = self.bg;
  ctx.fill(path);
  ctx.stroke(path);
  ctx.closePath();
}

weaponDisplay.z = pointsDisplay.z = powerUpsDisplay.z = chatButtonUi.z = ws.ZINDEX_UI + ws.ZINDEX_ORDER