var joy = new Joystick(110, innerHeight - 110);
joy.radius = app.height / 12;
joy.joyRadius = joy.radius / 2.5;

var fireBtn = new TButton('FIRE', innerWidth - 140, innerHeight - 230, 50);
fireBtn.filter = 'brightness(110%)';

var boostBtn = new TButton('BOOST', innerWidth - 100, innerHeight - 105, 35);

var pickUBtn = new TButton('P/U', innerWidth - 180, innerHeight - 115, 30);

function entityLayerToUI(entity) {
  entity.z = ws.ZINDEX_UI + ws.ZINDEX_ORDER;
}

const room = {
  time: 0,
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
  room.time+=1;
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
  // Convert seconds to time format 
  var sec = room.time / 60;
  var minutes = Math.floor(sec / 60); 
  var seconds = Math.floor(sec % 60); 
  // Formatting the time with leading zeros if necessary 
  var strTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; 

  
  var text = room.name+' '+strTime;
  ctx.font = '18px gamefont';
  ctx.fillStyle = ws.COLOR_YELLOW;
  var w = ctx.measureText(text).width;
  ctx.fillText(text, (innerWidth - w - 16), 18);
}
roomSecondRender.z = ws.ZINDEX_ORDER + ws.ZINDEX_UI;

var chatButtonUi = new ClassicEntity().send();
var iconsPackImg = new Image();
iconsPackImg.src = '/assets/icons/UiIconsPack_Transparent_Icons.png';
iconsPackImg.onload = function () {

chatButtonUi.render = function () {
  ctx.drawImage(iconsPackImg, 
  2003, 1555, 310, 265,
  10, 10, 45, 45);
}}

var chatBtnBBox = {
  x: 10, y: 10, width: 40, height: 40
}

var powerUpsDisplay = new ClassicEntity().send();
powerUpsDisplay.render = function () {
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
pointsDisplay.render = function () {
  ctx.drawImage(iconsPackImg,
    310*2, 310*3, 310, 310,
    7, 85, 30, 30);
  ctx.drawImage(coinImg, 7, 90, 30, 30)
    
  ctx.font = '16px gamefont';
  ctx.fillStyle = ws.COLOR_GREEN;
  ctx.fillText('3', 40, 110)
}

var weaponDisplay = new ClassicEntity().send();
weaponDisplay.render = function () {
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
rightBox.render = function () {
  var path = new Path2D();
  path.roundRect(innerWidth-150, 30, 140, 60, 5);
  
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = ws.COLOR_BLUE;
  ctx.lineWidth = 4;
  ctx.fill(path);
  ctx.stroke(path)
}

entityLayerToUI(rightBox)

class ImageCardOfTopRightBox {
  constructor(iconImage, subtext = 'null'){
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
    this.entity.render = function () {
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
      ctx.fillText(self.subtext, ((self.x+20)-(tw/2)), self.y + 45)
    }
    
    entityLayerToUI(this.entity)
  }
}

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

weaponDisplay.z = pointsDisplay.z = powerUpsDisplay.z = chatButtonUi.z = ws.ZINDEX_UI + ws.ZINDEX_ORDER 