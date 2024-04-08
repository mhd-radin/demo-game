ws.SCRIPT_GAME_PAGE = new Script(function() {
  let player = new Player();
  let myPlayer = player;
  player.x = ID(2);
  player.y = ID(2);
  player.assetName = 'woober.move';
  console.log(player)

  //joy.x = (joy.radius + 10);
  //joy.y = (app.height - (joy.radius + 10))
  joy._eventEmitter.on('update', function(e) {
    player.rotation = e.angleRadi;
    player.speed = (1 + (e.distanceJoy / 2000) > 6) ? 6 : 1 + (e.distanceJoy / 2000);
  })

  function properBtnEventHandleTS() {
    player.speed = 8
  }

  function properBtnEventHandleTE(param) {
    player.speed = 1
  }

  fireBtn.on('click', properBtnEventHandleTS);
  fireBtn.on('te', properBtnEventHandleTE);
  boostBtn.on('click', properBtnEventHandleTS);
  boostBtn.on('te', properBtnEventHandleTE);
  pickUBtn.on('click', function() {
    window.location.reload();
  });
  pickUBtn.on('te', properBtnEventHandleTE);


  class Bullet {
    constructor(x, y, angle, distance, speed = 5){
      this.x = x; this.y = y;
      this.angle = angle;
      this.distance = distance;
      this.directionX = Math.cos(this.angle)*this.distance;
      this.directionY = Math.sin(this.angle)*this.distance;
      this.currentDistance = 0;
      this.speed = speed;
      this.currentX = x;
      this.currentY = y;
    }
    
    move(){
      if (this.currentX >= this.directionX && this.currentY >= this.directionY) return 0;
      this.currentX += Math.cos(this.angle)*this.speed;
            this.currentY += Math.sin(this.angle)*this.speed;
      //this.distance = this.directionX - this.currentX;
      console.log(this)
    }
  }
  
  var b = new Bullet(50, 50, 60, 100, 0.7);
  b.move();
  b.move()

  let allPlayers = [];

  for (var i = 0; i < 14; i++) {
    var pl = new Player();
    pl.x = ID(2);
    pl.y = ID(2);
    pl.assetName = ['skiber', 'woober', 'fighter'][Math.floor(Math.random() * 3)] + '.move'
    allPlayers.push(pl);
    pl.speed = Math.random();
  }

  allPlayers.push(player)

  allPlayers.forEach(function(player = new Player(), i) {
    var currentFrame = player.currentFrame;
    var asset = getVehicleAssetByName(player.assetName);
    var img = createImageByAsset(asset);

    img.onchange = function() {
      currentFrame = 1;
    }

    var thisPlayer = (player.id == myPlayer.id ? player : false)

    var playerEntity = new ClassicEntity().send();
    playerEntity.fixed = false;
    if (thisPlayer) {
      playerEntity.update = function() {
        app.cameraX = thisPlayer.x;
        app.cameraY = thisPlayer.y;

        player.x += Math.cos(player.rotation) * player.speed;
        player.y += Math.sin(player.rotation) * player.speed;
      }
    } else {

      playerEntity.update = function() {
        player.x += Math.cos(player.rotation) * player.speed;
        player.y += Math.sin(player.rotation) * player.speed;
      }
    }

    playerEntity.render = function() {

      // player.speed = (player.assetName == player.vehicle + '.move') ? (Math.random()) : Math.random() / 5;

      //if (thisPlayer) {thisPlayer.speed = document.getElementById('speed').value ;
      //thisPlayer.rotation = document.getElementById('angle').value / 100}

      img.src = asset.path;
      ctx.translate(player.x, player.y)
      ctx.rotate(player.rotation + (asset.r ? asset.r : 0));
      var assetX = asset.w * currentFrame,
        assetY = asset.y;

      currentFrame += 1;
      currentFrame = (currentFrame % asset.frames);
      ctx.drawImage(img, assetX, assetY, asset.w, asset.h, (-100 / 2), (-100 / 2), 100, 100)
    }
  })
})